<?php

namespace App\Http\Controllers;

use acidjazz\metapi\MetApi;
use Faker\Factory;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Artisan;

class Controller extends BaseController
{
    use AuthorizesRequests;
    use DispatchesJobs;
    use ValidatesRequests;
    use MetApi;

    public function __construct(Request $request)
    {
        $this->metApiInit($request);
    }

    /**
     * Display our routes
     */
    public function routes(): string
    {
        Artisan::call('route:list --json');
        $routes = json_decode(Artisan::output());
        $html = <<<'TABLE'
            <style lang="css">
            body { margin: 20px; }
            .routes {
            border: 1px solid #e2e8f0;
            padding: 6px;
            width: 100%;
            border-collapse: collapse;
            font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,serif;
            font-size: 14px;
            color: #666;
            }
            .routes th, .routes td {
            padding: 4px 6px;
            border-right: 1px solid #e2e8f0;
            }
            .routes tr { border: 1px solid #e2e8f0; }
            </style>
            <table class="routes">
            <thead>
                <tr>
                    <th>Method</th>
                    <th>URI</th>
                    <th>Name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            TABLE;

        foreach ($routes as $route) {
            $html .= <<<BODY
                <tr>
                <td> $route->method </td>
                <td> $route->uri </td>
                <td> $route->name </td>
                <td> $route->action </td>
                </tr>
            BODY;
        }
        $html .= '</tbody></table>';

        return $html;
    }

    /**
     * Example endpoint returning random users
     */
    public function example(Request $request): Response|JsonResponse
    {
        if (! app()->environment('testing')) {
            sleep(1);
        }

        $this
            ->option('count', 'required|integer')
            ->verify();

        $faker = Factory::create();
        $users = [];

        for ($i = 0; $i !== (int) $request->get('count'); $i++) {
            $email = $faker->unique()->safeEmail;
            $users[] = [
                'name' => $faker->name(),
                'job' => $faker->jobTitle,
                'email' => $email,
                'avatar' => 'https://avatars.dicebear.com/api/human/' . $email . '.svg',
            ];
        }

        return $this->render($users);
    }

    public function exampleError(): Response|JsonResponse
    {
        // @phpstan-ignore-next-line
        return $this->render(['forced_error' => $forced_error]);
    }

    public function auth(): Redirector|Application|RedirectResponse
    {
        return redirect(config('app.web'));
    }
}
