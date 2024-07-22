<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('chat', function ($user) {
    return $user;
});

Broadcast::channel('jackpot-participants', function ($user) {
    return $user;
});

Broadcast::channel('ganhador', function ($user) {
    return $user;
});
