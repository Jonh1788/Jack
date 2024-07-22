<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Sorteio;
use Illuminate\Support\Facades\Log;
use App\Events\AnunciarGanhador;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Broadcast;
use App\Events\Participants;
use Illuminate\Support\Facades\HTTP;

class FinalizarSorteio implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $sorteioId;

    public function __construct($sorteioId)
    {
        $this->sorteioId = $sorteioId;
    }

    public function handle()
    {
        $sorteio = Sorteio::find($this->sorteioId);
        if (!$sorteio) {
            
            return;
        }

        $participants = $sorteio->participants;

        $allNumbers = [];
        foreach ($participants as $participant) {
            
            $allNumbers[] = $participant['numbers'];
        }

        $winnerNumber = $allNumbers[array_rand($allNumbers)];
        
        $winner = null;
        foreach ($participants as $participant) {
            if (in_array($winnerNumber[0], $participant['numbers'])) {
                $winner = $participant;
                break;
            }
        }

    
        
        if ($winner) {
            $sorteio->winner = $winner["user_id"];
            $sorteio->winner_number = $winnerNumber[0];
            $sorteio->save();

            $enviar = [
                "userId" => $winner["user_id"],
            ];

            try{

                
                $respostas = HTTP::get("localhost:8000/anunciarGanhador/". $sorteio->id);
               

            }
            catch(\Exception $e){
                Log::error($e->getMessage());
            }
        }
    }
}