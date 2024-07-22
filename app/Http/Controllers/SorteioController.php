<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sorteio;
use Carbon\Carbon;
use App\Events\Participants;
use App\Events\InicioSorteio;
use Illuminate\Support\Facades\DB;
use App\Jobs\FinalizarSorteio;
use App\Events\AnunciarGanhador;
use Inertia\Inertia;
class SorteioController extends Controller
{
    public function anunciarGanhador($id){

        $sorteio = Sorteio::find($id);
        $winner = $sorteio->winner;
        $winnerNumber = $sorteio->winner_number;

        $sorteado = [
            'winner' => $winner,
            'winnerNumber' => $winnerNumber
        ];
        
        if($sorteio->finished){
            return response()->json(['error' => 'Sorteio já finalizado']);
        }
        
        $sorteio->finished = 1;
        $sorteio->save();
        $user = DB::table('users')->where('id', $winner)->first();
        broadcast(new AnunciarGanhador($sorteado))->toOthers();
        return response()->json([$sorteado]);
        
    }

    public function index(){
        $sorteio = Sorteio::where("name", "jackpot1")->where("finished", false)->first();

        if($sorteio){
            return Inertia::render('Welcome', ['sorteio' => $sorteio]);
        }

        return Inertia::render('Welcome');
    }
    
    public function sorteio(Request $request){
        $valor = $request->input('valor');
        $userId = $request->input('userId');
        $jackpotName = $request->input('jackpotName');
        
        $user = DB::table('users')->where('id', $userId)->first();

        if($user->balance < $valor){
            return response()->json(['error' => 'Saldo insuficiente']);
        }

        $user->balance = $user->balance - $valor;
        DB::table('users')->where('id', $userId)->update(['balance' => $user->balance]);
        $sorteio = Sorteio::where('name', $jackpotName)->where('finished', false)->first();

        if(!$sorteio){
            $sorteio = Sorteio::create([
                'name' => $jackpotName,
                'participants' => [],
                'finished' => false,
                'date' => now(),
                'total_numbers' => 0,
                'prize' => $valor,
                'hash' => null,
                'end_date' => null
            ]);
        }

        $sorteio->addParticipants($userId, $valor, $user->name);
        
        broadcast(new Participants($sorteio))->toOthers();

        $totalUniqueUserIdParticipants = collect($sorteio->participants)->pluck('user_id')->unique()->count();
        
        if($totalUniqueUserIdParticipants >= 2 && $sorteio->total_numbers >= 20 ){
            $sorteio->end_date = Carbon::now()->addMinutes(1);
            $sorteio->save();
            broadcast(new InicioSorteio($sorteio))->toOthers();
            FinalizarSorteio::dispatch($sorteio->id)->delay(now()->addMinutes(1));
           
        }

        return response()->json(['sorteio' => $sorteio]);
    }
}
