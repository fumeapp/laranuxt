<?php

namespace App\Policies;

use App\Models\User;
use Fumeapp\Humble\Models\Session;
use Illuminate\Auth\Access\HandlesAuthorization;

class SessionPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Session $session): bool
    {
        ray('we are in the delete function of SessionPolicy');

        return $user->id === $session->user_id;
    }
}
