<?php

namespace App\Http\Controllers;

use acidjazz\metapi\MetApi;
use Faker\Factory;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Artisan;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests, MetApi;

    /**
     * Display our routes
     *
     * @return string
     */
    public function routes(): string
    {
        Artisan::call('route:list');
        $routes = explode("\n", Artisan::output());
        foreach ($routes as $index => $route) {
            if (str_contains($route, 'debugbar')) {
                unset($routes[$index]);
            }
        }
        return '<pre>' . implode("\n", $routes) . '</pre>';
    }

    /**
     * Example endpoint returning random users
     *
     * @param Request $request
     * @return mixed
     */
    public function example(Request $request): Response|JsonResponse
    {
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

    public function error(): Response|JsonResponse
    {
        return $this->render(['forced_error' => $forced_error]);
    }
}
