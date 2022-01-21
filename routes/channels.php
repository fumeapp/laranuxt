<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('Team.{team}', function ($user, Team $team) {
    return $team->users->contains($user);
});
Broadcast::channel('User.{id}', function ($user, $id) {
    return $user->id === (int) $id;
});
