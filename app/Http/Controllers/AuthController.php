<?php

namespace App\Http\Controllers;

use App\Models\Provider;
use App\Models\User;
use App\Notifications\LoginAttempt;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    /**
     * Provider a redirect URL
     */
    public function redirect(string $provider): mixed
    {
        if (! in_array($provider, Provider::$allowed)) {
            return $this->error('auth.provider-invalid');
        }

        return Socialite::driver($provider)->stateless()->redirect();
    }

    /*
    public function onetap(string $credential)
    {
        $client = new Client(['client_id' => config('services.google.client_id')]);
        $oaUser = (object) $client->verifyIdToken($credential);
        if (!isset($oaUser->sub)) {
            return $this->error('auth.provider-invalid');
        }
        $user = $this->oaHandle($oaUser, 'google');

        // @var User $user
        auth()->login($user, 'google');

        return $this->render([
            'token' => auth()->token(),
            'user' => auth()->user(),
        ])->cookie('token', auth()->token(), 0, '');
    }
    */

    /**
     * Callback hit by the provider to verify user
     */
    public function callback(string $provider, Request $request): Response
    {
        if (! in_array($provider, Provider::$allowed)) {
            return $this->error('auth.generic');
        }

        $oaUser = Socialite::driver($provider)->stateless()->user();

        $user = $this->oaHandle($oaUser, $provider);

        /** @var User $user */
        auth()->login($user, $provider);

        return $this->response($provider);
    }

    /**
     * Handle the login/creation process of a user
     *
     * @param  mixed  $oaUser
     */
    private function oaHandle($oaUser, string $provider): User
    {
        if (! $user = User::where('email', $oaUser->email)->first()) {
            $user = $this->createUser(
                $provider,
                $oaUser->name,
                $oaUser->email,
                $oaUser->picture ?? $oaUser->avatar_original ?? $oaUser->avatar,
                (array) $oaUser
            );
        }

        if ($user->avatar === null) {
            $user->avatar = $oaUser->picture ?? $oaUser->avatar_original ?? $oaUser->avatar;
            $user->save();
        }

        if (! $user->providers->where('name', $provider)->first()) {
            Provider::create(
                [
                    'user_id' => $user->id,
                    'name' => $provider,
                    'avatar' => $oaUser->picture ?? $oaUser->avatar_original ?? $oaUser->avatar,
                    'payload' => (array) $oaUser,
                ]
            );
        }

        return $user;
    }

    private function response(string $provider): Response
    {
        return response(
            view('complete', [
                'json' => json_encode([
                    'token' => auth()->token(),
                    'user' => auth()->user(),
                    'provider' => $provider,
                ]),
            ])
        )->cookie('token', auth()->token(), 60 * 24 * 30, '/', '', true, false);
    }

    /**
     * Create new users with their initial team
     */
    private function createUser(string $provider, string $name, string $email, string $avatar, array $payload): User
    {
        $user = User::create([
            'name' => $name,
            'email' => $email,
            'avatar' => $avatar,
        ]);
        Provider::create([
            'user_id' => $user->id,
            'name' => $provider,
            'avatar' => $avatar,
            'payload' => $payload,
        ]);

        return $user;
    }

    /**
     * Login attempt via e-mail
     */
    public function attempt(Request $request): Response|JsonResponse
    {
        $this
            ->option('email', 'required|email')
            ->option('action', 'nullable|string')
            ->verify();

        if (! $user = User::where('email', $request->email)->first()) {
            $user = $this->createUser(
                'email',
                explode('@', $request->email)[0],
                $request->email,
                'https://www.gravatar.com/avatar/' . md5($request->email),
                []
            );
        }

        $attempt = auth()->attempt($user, json_decode($request->action));
        $user->notify(new LoginAttempt($attempt));

        return $this->success('auth.attempt');
    }

    /**
     * Verify the link clicked in the e-mail
     */
    public function login(string $token): Response|JsonResponse
    {
        if (! $login = auth()->verify($token)) {
            return $this->error('auth.failed');
        }

        return $this->render([
            'token' => auth()->token(),
            'user' => auth()->user(),
            'action' => $login->action, // @phpstan-ignore-line
        ])->cookie('token', auth()->token(), 60 * 24 * 30, '/', '', true, false);
    }

    /**
     * Standard user info auth check
     */
    public function me(Request $request): Response|JsonResponse
    {
        $this
            ->option('providers', 'boolean')
            ->verify();

        if ($request->providers) {
            return $this->render(User::whereId(auth()->user()?->id)->with(['providers'])->first());
        }
        auth()->user()?->session->touch();

        return $this->render(auth()->user());
    }

    /**
     * Update user info
     *
     * @return Response|JsonResponse
     */
    public function update(Request $request)
    {
        $this
            ->option('name', 'required|string')
            ->option('avatar', 'required|url')
            ->verify();

        /** @var User $user */
        $user = auth()->user();

        $user->name ??= $request->name;
        $user->avatar ??= $request->avatar;
        $user->save();

        return $this->success('user.updated');
    }

    /**
     * Log a user out
     */
    public function logout(): Response|JsonResponse
    {
        auth()->logout();

        return $this->success('auth.logout')->cookie('token', false, 0, '/', '', true, false);
    }
}
