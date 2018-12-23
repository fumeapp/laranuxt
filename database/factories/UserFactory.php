<?php

use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(App\User::class, function (Faker $faker) {
    $email = $faker->unique()->safeEmail;
    return [
        'name' => $faker->name(),
        'email' => $email,
        'avatar' => 'http://i.pravatar.cc/150?u='.$email,
        'role' => 'member',
    ];
});
