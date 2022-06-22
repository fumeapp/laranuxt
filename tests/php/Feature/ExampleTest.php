<?php

namespace Tests\Feature;

use Illuminate\Http\Response;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testBasicTest()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    /**
     * Test Our Example Endpoint required parameters are present
     *
     * @return void
     */
    public function testFail()
    {
        $this->json('get', '/example')
            ->assertStatus(Response::HTTP_BAD_REQUEST)
            ->assertJsonStructure([
                'status',
                'errors' => [
                    '*' => [
                        'status',
                        'message',
                        'detail',
                    ],
                ],
            ]);
    }

    /**
     * Test our our example endpoint returns random users
     *
     * @return void
     */
    public function testExample()
    {
        $count = 1;

        $this->json('get', "/example?count={$count}")
            ->assertOk()
            ->assertJson(fn (AssertableJson $json) => $json->where('status', 'success')
                    ->has('benchmark')
                    ->has('query')
                    ->has('data')
                    ->has('data.0', fn ($json) => $json->has('name')
                            ->has('job')
                            ->has('email')
                            ->has('avatar')));
    }
}
