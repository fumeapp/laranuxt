<?php

namespace App\Policies;

use acidjazz\Humble\Models\Session;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class SessionPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param User $user
     * @return Response|bool
     */
    public function viewAny(User $user)
    {
        //
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param User $user
     * @param Session $session
     * @return Response|bool
     */
    public function view(User $user, Session $session)
    {
        //
    }

    /**
     * Determine whether the user can create models.
     *
     * @param User $user
     * @return Response|bool
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param User $user
     * @param Session $session
     * @return Response|bool
     */
    public function update(User $user, Session $session)
    {
        //
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param User $user
     * @param Session $session
     * @return bool
     */
    public function delete(User $user, Session $session): bool
    {
        ray('we are in the delete function of SessionPolicy');
        return $user->id === $session->user_id;
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param User $user
     * @param Session $session
     * @return Response|bool
     */
    public function restore(User $user, Session $session)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param User $user
     * @param Session $session
     * @return Response|bool
     */
    public function forceDelete(User $user, Session $session)
    {
        //
    }
}
