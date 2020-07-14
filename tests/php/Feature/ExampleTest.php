<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    /**
     * Test result count of 9
     *
     * @return void
     */
    public function testNineResults()
    {
        $response = $this->json('get', '/example', ['count' => 9]);
        $json = $response->json();
        $this->assertCount(9, $json['data']);
        $response->assertStatus(200);
    }

    /**
     * Test result count of 27
     *
     * @return void
     */
    public function testTwentySevenResults()
    {
        $response = $this->json('get', '/example', ['count' => 27]);
        $json = $response->json();
        $this->assertCount(27, $json['data']);
        $response->assertStatus(200);
    }
}
