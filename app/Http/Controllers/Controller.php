<?php

namespace App\Http\Controllers;

use acidjazz\metapi\MetApi;
use Faker\Factory;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Request;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests, MetApi;

    /**
     * Display our routes
     *
     * @return string
     */
    public function routes()
    {
        Artisan::call('route:list');
        $routes = explode("\n", Artisan::output());
        foreach ($routes as $index=>$route) {
            if (strpos($route, 'debugbar') !== false) {
                unset($routes[$index]);
            }
        }
        return '<pre>'.implode("\n", $routes).'</pre>';
    }

    /**
     * Example endpoint returning random users
     *
     * @return mixed
     */
    public function example()
    {

        $this->option('order', 'in:name,email');
        $this->verify();

        $faker = Factory::create();
        $users = [];

        for ($i = 0; $i !== 9; $i++) {
            $email = $faker->unique()->safeEmail;
            $users[] = [
                'name' => $faker->name(),
                'job' => $faker->jobTitle,
                'email' => $email,
                'phone' => $faker->phoneNumber(),
                'avatar' => 'http://i.pravatar.cc/150?u='.$email,
            ];
        }

        return $this->render($users);
    }

    public function error()
    {
        return $this->render(['forced_error' => $forced_error]);
    }
}
