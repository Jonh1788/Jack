<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\MessageSent;

class ChatController extends Controller
{
    public function sendMessage(Request $request){
        $message = $request->input('message');
        $name = $request->input('name');

        $objeto =  [
            'name' => $name,
            'message' => $message
        ];

        broadcast(new MessageSent($objeto))->toOthers();
        return response()->json(['message' => $message]);

    }
}
