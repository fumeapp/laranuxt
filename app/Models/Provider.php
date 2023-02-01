<?php

namespace App\Models;

use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * App\Models\Provider
 *
 * @property int $id
 * @property int $user_id
 * @property string|null $avatar
 * @property string $name
 * @property array $payload
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @method static Builder|Provider newModelQuery()
 * @method static Builder|Provider newQuery()
 * @method static Builder|Provider query()
 * @method static Builder|Provider whereAvatar($value)
 * @method static Builder|Provider whereCreatedAt($value)
 * @method static Builder|Provider whereId($value)
 * @method static Builder|Provider whereName($value)
 * @method static Builder|Provider wherePayload($value)
 * @method static Builder|Provider whereUpdatedAt($value)
 * @method static Builder|Provider whereUserId($value)
 *
 * @mixin Eloquent
 */
class Provider extends Model
{
    public static array $allowed = ['email', 'google', 'facebook'];

    protected $guarded = [];

    protected $casts = ['payload' => 'array'];

    protected $hidden = ['payload.token'];
}
