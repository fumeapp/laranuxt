<?php

namespace App\Http\Controllers;

use Fumeapp\Humble\Models\Session;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class SessionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse|Response
    {
        sleep(1);

        return $this->render(Session::whereUserId(auth()->user()?->id)->get());
    }

    /**
     * Remove the specified resource from storage.
     *
     *
     * @throws AuthorizationException
     */
    public function destroy(Session $session): JsonResponse|Response
    {
        $this->authorize('delete', $session);
        $session->delete();

        return $this->success('auth.session-removed');
    }
}
