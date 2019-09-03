<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class Controller extends \acidjazz\metapi\MetApiController
{

    public function __construct(Request $request)
    {
        parent::__construct($request);
    }

    public function routes(Request $request)
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

    public function example(Request $request)
    {

        $this->option('order', 'in:name,email');
        $this->verify();

        $faker = \Faker\Factory::create();
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
}
