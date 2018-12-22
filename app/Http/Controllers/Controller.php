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

    public function index(Request $request)
    {
        $routes = Artisan::call('route:list');
        return '<pre>'.Artisan::output().'</pre>';
    }

    public function test(Request $request)
    {
        return $this->render(['this','is','from','the','server']);
    }
}
