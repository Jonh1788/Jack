import ApostaCard from '@/Components/ApostaCard';
import Chat from '@/Components/Chat';
import SortudoCard from '@/Components/SortudoCard';
import UltimosJogos from '@/Components/UltimosJogos';
import VencedorCard from '@/Components/VencedorCard';
import { Link, Head, router } from '@inertiajs/react';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Wheel } from 'react-custom-roulette'




const data = [
   { option: '0' , style: { backgroundColor: '#123040', textColor: 'white' }},
 

  ]
export default function Welcome({ auth, laravelVersion, phpVersion, sorteio }) {

    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    

    const requestRef = useRef();
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState('');
    const [modal, setModal] = useState(false);
    const [aposta, setAposta] = useState("");
    const [participants, setParticipants] = useState([]);
    const [jogadores, setJogadores] = useState(0);
    const [valorTotal, setValorTotal] = useState(0);
    const [listaJogadores, setListaJogadores] = useState([]);
    const [nameMap, setNameMap] = useState({});
    const [values, setValues] = useState([]);
    const [timer, setTimer] = useState(0);
    const [sorteado, setSorteado] = useState(0);
    const [numeroSorteado, setNumeroSorteado] = useState(0);
    const [winnerModal, setWinnerModal] = useState(false);
    const [endDate, setEndDate] = useState(null);
    const [colorMap, setColorMap] = useState({});

    const atualizarDados = (e) => {
            var mapaCor = JSON.parse(localStorage.getItem('colorMap')) || {};
            setColorMap(mapaCor);
            var obj = {}
            var arrayTodos = []
            var dados = e.participants;
            var novaData = dados.map((e) => {
                
                if(!colorMap[e.user_id]){
                    colorMap[e.user_id] = generateRandomColor();
                }
                var name = {};
                if(!nameMap[e.user_id]){
                    name = nameMap;
                    name[e.user_id] = e.name;
                    setNameMap(name);

                }
                var userColor = colorMap[e.user_id];
                var user = e.user_id;
               
              return e.numbers.map((element) => {
                    obj = {option: element, userId: user, name:e.name ,style: { backgroundColor: userColor, textColor: 'white' }}
                    arrayTodos.push(obj)
                });
            });

            arrayTodos.forEach((e) => {
                if(!apostasRealizadas[e.userId]){
                    apostasRealizadas[e.userId] = 0;
                }

                if(!apostasRealizadas["total"]){
                    apostasRealizadas["total"] = 0;
                }

                apostasRealizadas[e.userId] += 1;
                apostasRealizadas["total"] +=1;

            })
            
            var userIdsUnicos = Object.keys(apostasRealizadas);
            setJogadores(userIdsUnicos.length - 1);
            userIdsUnicos = userIdsUnicos.filter((e) => e !== 'total');
            var valores = Object.values(apostasRealizadas);
            setValues(valores);
            setListaJogadores(userIdsUnicos);
            setValorTotal(apostasRealizadas["total"]);
            setParticipants(arrayTodos);

            localStorage.setItem('colorMap', JSON.stringify(colorMap));

            requestAnimationFrame(() => updateTimer(sorteio));
    }

    const updateTimer = (e) => {
        
            var dataFinal = new Date(e.end_date);
            const now = new Date();
            const tempoRestante = (dataFinal - now) / 1000;

            setTimer(Math.floor(tempoRestante));
            
            if(tempoRestante > 0){
                requestRef.current = requestAnimationFrame(() => updateTimer(e));
            } else if(tempoRestante <= 0){
                setTimer(0);
                cancelAnimationFrame(requestRef.current);
            }
        
    }

    useEffect(() => {
        if(sorteio){
            atualizarDados(sorteio);
        }

        window.Echo.channel('jackpot-inicio')
        .listen("InicioSorteio", (e) => {
            requestRef.current = requestAnimationFrame(() => updateTimer(e));
        })
            


        window.Echo.channel('ganhador')
        .listen("AnunciarGanhador", (e) => {
            if(!mustSpin){
            console.log(e)
            setPrizeNumber(e.numero);
            setNumeroSorteado(e.sorteado);
            setMustSpin(true);
        }
        })

        return () => {
            window.Echo.leaveChannel('ganhador');
            window.Echo.leaveChannel('jackpot-inicio');
            cancelAnimationFrame(requestRef.current);
        }
    }, []);

    const handleWinner = () => {
        setMustSpin(false);
        
        if(auth.user.id == numeroSorteado){
            setWinnerModal(true);
        }
    }

    useEffect(() => {
        
        window.Echo.channel('jackpot-participants')
                    .listen("Participants", (e) => {
                        atualizarDados(e);
                    })

    }, [participants]);

    const handleSpinClick = () => {
      if (!mustSpin) {
        setMustSpin(true);
      }
    }
    const closeModal = () => {
        setModal(false);
    }
    
    const openModal = () => {
        setModal(true);
    }

    const handleChange = (e) => {
        setAposta(e.target.value);
    }

    function generateRandomColor() {
        return `rgb(${getRandomInt(256)}, ${getRandomInt(256)}, ${getRandomInt(256)})`;
    }
    
    var apostasRealizadas = {};
    const apostar = () => {
        if (!aposta) {
            return;
        }
        setAposta('');
        closeModal();
        axios.post('/jackpot1', {
            valor: aposta,
            jackpotName: 'jackpot1',
            userId: auth.user.id
        }).then(response => {
            
            atualizarDados(response.data.sorteio);
            auth.user.balance = auth.user.balance - aposta;
            
            
        }).catch(error => {
            console.log(error);
        });
    }

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    }
   
    return (
        <>
            <Head title="Welcome" />
            <div className="bg-backgroundgeneral h-max w-screen flex flex-col font-inter m-0 relative">
                {modal && (
                    <div className='absolute inset-0 bg-white/20 z-[100] flex items-center justify-center'>
                        <div className='bg-backgroundnav rounded-md size-96 p-2 text-center flex flex-col gap-4 justify-center' >
                            <p className='text-sm font-inter font-medium text-textcard border border-background1 rounded-md p-2'>Seu saldo: R$ {auth.user.balance ? auth.user.balance : 0}</p>
                            <input value={aposta} onChange={handleChange} placeholder='Digite sua aposta' type="text" pattern='[0-9]*' inputMode='numeric' className='bg-white/5 ring-transparent border-none rounded-lg text-textcard'/>
                            <button onClick={apostar} className='bg-bluecard text-textcard rounded-lg font-extrabold py-3 px-8 drop-shadow-card border-b-4 border-[#2673F8]'>
                                Apostar
                            </button>

                            <button onClick={closeModal} className='bg-red-500 text-textcard rounded-lg font-extrabold py-3 px-8 drop-shadow-card border-b-4 border-red-800'>Fechar</button>
                        </div>
                    </div>

                )}

                {winnerModal && (
                    <div className='absolute inset-0 bg-white/20 z-[100] flex items-center justify-center'>
                        <div className='bg-backgroundnav rounded-md size-96 p-2 text-center flex flex-col gap-4 justify-center' >
                            <h1 className='text-textcard text-2xl font-kanit'>Parabéns {auth.user.name} você ganhou!</h1>
                            <p className='text-textcard text-2xl font-kanit'>R${valorTotal},00</p>
                            

                            <button onClick={() => setWinnerModal(false)} className='bg-red-500 text-textcard rounded-lg font-extrabold py-3 px-8 drop-shadow-card border-b-4 border-red-800'>Fechar</button>
                        </div>
                    </div>

                )}
                    <header className='w-full h-[72px]'>
                        <nav className='w-full h-full bg-backgroundnav flex justify-between items-center px-8 py-5'>
                            <div className='font-kanit font-[600] text-[#4889F9]'>Jackteam.</div>

                            <div className='text-muted text-xs leading-4 flex gap-4 items-center'>
                                <Link href={route('login')} className='text-selected bg-nav p-3 rounded-l-lg rounded-tr-lg border border-border'>Jackpot Diário</Link>
                                <Link href={route('register')} className=''>Jackpot Semanal</Link>
                                <Link className=''>Coinflip</Link>
                                <Link className=''>Como funciona?</Link>
                            </div>
                            {auth.user ? (
                                 <div className='flex items-center text-selected gap-3'>

                                 <div className='rounded-full border border-background1 p-2'>
                                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                         <path fill-rule="evenodd" clip-rule="evenodd" d="M17.999 7H6.00101C5.25701 7 4.77301 7.785 5.10801 8.45L5.61101 9.45C5.78101 9.787 6.12701 10 6.50501 10H17.496C17.874 10 18.219 9.787 18.389 9.45L18.892 8.45C19.227 7.785 18.743 7 17.999 7V7Z" stroke="#6E82EB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                         <path d="M14.957 5.88901C14.094 6.78701 12.737 7.00001 12.08 7.00001" stroke="#6E82EB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                         <path d="M12.0801 7C12.0801 7 11.6851 4.508 12.6571 3.496" stroke="#6E82EB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                         <path d="M14.957 5.889C15.592 5.228 15.592 4.156 14.957 3.495C14.322 2.834 13.292 2.834 12.657 3.495" stroke="#6E82EB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                         <path d="M9.04297 5.88901C9.90597 6.78701 11.263 7.00001 11.92 7.00001" stroke="#6E82EB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                         <path d="M11.9199 7C11.9199 7 12.3149 4.508 11.3429 3.496" stroke="#6E82EB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                         <path d="M9.04302 5.889C8.40802 5.228 8.40802 4.156 9.04302 3.495C9.67802 2.834 10.708 2.834 11.343 3.495" stroke="#6E82EB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                         <path d="M6.08 9.896C5.541 10.789 4.282 12.875 3.552 14.086C3.19 14.685 3 15.37 3 16.071V16.071C3 16.993 3.331 17.884 3.933 18.583L4.866 19.665C5.597 20.513 6.661 21 7.78 21H16.22C17.339 21 18.403 20.513 19.134 19.665L20.067 18.583C20.669 17.884 21 16.993 21 16.071V16.071C21 15.37 20.809 14.683 20.447 14.083L17.92 9.896" stroke="#6E82EB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                     </svg>
                                 </div>
 
                                 <div>
                                     <p className='font-kanit text-sm font-medium'>R$ {auth.user.balance ? auth.user.balance : 0}</p>
                                     <p className='text-muted text-xs'>Saldo em conta</p>
                                 </div>
 
                                 <div className='border-l border-background1 h-12 w-px'/>
 
                                 <div className='size-10'>
                                     <img src="image.png" alt="" />
                                 </div>
 
                             </div>
                            ):
                            (
                               <div className='text-sm text-muted flex gap-3'>
                                    <Link className='border border-background1 p-2 rounded-md bg-bluecard text-textcard font-kanit drop-shadow-card hover:bg-bluecard/50' href={route('login')}>Login</Link>
                                    <Link className='border font-kanit border-background1 p-2 rounded-md hover:bg-white/10' href={route('register')}>Registrar</Link>
                               </div>
                            )}
                           

                        </nav>
                    </header>

                    <main className='flex flex-col p-8 w-full gap-6'>
                        {/* Banner */}
                        <div className='w-full h-60'>
                            <img src="Banner.png" alt="" />
                        </div>
                            
                        {/* Jackpot */}
                        <div className='w-full  flex gap-6'>   
                                {/* Apostas e roleta */}
                                <div className='h-[692px] w-[884px] flex bg-backprin'>

                                    <div className='w-52 h-full flex flex-col p-2 gap-2 overflow-y-auto  scrollbar-thumb-blue-600 scrollbar-thin scrollbar-track-backprin scrollbar2'>
                                        
                                        {listaJogadores.map((e) => (
                                            <ApostaCard name={nameMap[e]} total={values[e-1]} percentual={(values[e-1] / valorTotal) * 100} rgba={ colorMap[e] ? colorMap[e] : "rgba(0,0,0,0)"}/>
                                        ))}

                                    </div>

                                    <div className='text-textcard flex w-full flex-col items-center justify-center py-16 gap-4 relative'>
                                        {/* Roleta */}
                                        <div className='h-full w-full flex items-center justify-center relative'>
                                            {/* <div className='size-[520px] bg-green-500 rounded-full'>
                                               
                                            </div> */}
                                               
                                               <div className='rotate-[-45deg] size-[420px] -ml-8'>
                                                    <Wheel
                                                        
                                                        
                                                        mustStartSpinning={mustSpin}
                                                        prizeNumber={prizeNumber}
                                                        data={participants.length > 0 ? participants : data}
                                                        innerRadius={60}
                                                        outerBorderWidth={0}
                                                        radiusLineWidth={0}
                                                        radiusLineColor='#ffffff'
                                                        perpendicularText={true}
                                                        textDistance={70}
                                                        disableInitialAnimation={true}
                                                        fontSize={0.1}
                                                        
                                                        pointerProps={{
                                                            src: 'pointer.svg',
                                                            style: {rotate: '45deg', transform: 'translate(-30%, 0)'}
                                                        }}

                                                        onStopSpinning={handleWinner}
                                                    />

                                                    </div>

                                            <div className='size-[200px] bg-[#1c1d26] absolute bottom-[120px] rounded-full z-10 flex flex-col items-center justify-center'>
                                                <h1 className="font-karin text-4xl">R$ {valorTotal || 0},00</h1>
                                                <p className='text-muted'>{jogadores}/50 Jogadores</p>
                                            </div>
                                        </div>

                                        <button disabled={!auth.user} onClick={openModal} className='bg-bluecard text-textcard rounded-lg font-extrabold py-3 px-8 drop-shadow-card border-b-4 border-[#2673F8]'>
                                            JOGAR
                                        </button>
                                        <button onClick={handleSpinClick}>Rodar</button>
                                        {/* Timer */}
                                        <div className='absolute top-6 rounded-lg text-[#FEDA35] right-6 h-12 w-28 bg-[#FEDA3514] border border-[#FEDA35] flex items-center justify-center gap-2 px-3 py-2'>
                                            <div className='size-6'>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="12" cy="12" r="9.00375" stroke="#FEDA35" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M15.4554 13.1515L12 12V5.9975" stroke="#FEDA35" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                            </div>
                                            <p className='font-kanit font-medium text-3xl'>{`${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2,"0")}`}</p>
                                        </div> 

                                    </div>

                                </div>
                                {/* Último vencedor e sortudo */}
                                <div className='max-w-40 h-[692px]  flex flex-col gap-6'>
                                    <VencedorCard />
                                    <SortudoCard />
                                </div>  
                                {/* Chat */}
                                <Chat disable={!auth.user} auth={auth}/>
                            
                        </div>

                        <div className='w-full flex flex-col bg-backprin rounded-md'>
                            <div className='bg-[#1E2129] px-4 py-3 text-textcard font-karin font-medium leading-5'>
                                <h1>Últimos Jogos</h1>
                            </div>
                            <div className='p-4 flex flex-col gap-2'>
                                <UltimosJogos />
                                <UltimosJogos />
                                <UltimosJogos />
                                <UltimosJogos />
                                <UltimosJogos />

                            </div>
                        </div>
                    </main>
            </div>      
        </>
    );
}
