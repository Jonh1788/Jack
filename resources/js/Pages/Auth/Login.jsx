import { useEffect, useRef } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import Mail from '@/Components/Mail';
import PasswordIcon from '@/Components/PasswordIcon';
import EyeIcon from '@/Components/EyeIcon';
import LeafClover from '@/Components/LeafClover';

export default function Login({ status, canResetPassword }) {
    const passwordRef = useRef(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    const passwordReveal = () => {
        passwordRef.current.type = passwordRef.current.type === 'password' ? 'text' : 'password';
    }

    return (


            <main className='flex min-h-screen relative z-10'>
            <div className=' absolute inset-0 w-full h-full -z-10 bg-[#1B1D24]'>
                <img src="/banner.jpeg" alt="" className='size-full object-fill mix-blend-luminosity' />
            </div>
            <Head title="Log in" />
            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <div className='w-full bg-backgroundnav flex flex-col'>
                <div >
                    <div className='font-kanit font-[600] text-[#4889F9] text-3xl ml-28 py-5'>Jackteam.</div>
                </div>

                <div className='flex-col flex w-full h-full px-28 mt-36 gap-8'>
                    <div>
                        <h1 className='text-3xl font-kanit text-textcard font-bold'>Boas vindas a melhor plataforma de Jackpot.</h1>
                        <p className='text-muted text-xs'>Tenha o máximo de aprovação em pagamento utilizando nosso checkout de alta conversão</p>
                    </div>
                    
                    <form onSubmit={submit} className='flex flex-col gap-2'>    

                        <div className="flex items-center  bg-background1 rounded-md px-2 has-[input:focus]:ring has-[input:focus]:border-indigo-500 has-[input:focus]:ring-indigo-500">
                            <Mail />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className=" block w-full"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                placeholder="Digite seu email..."
                            />

                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="flex items-center bg-background1 rounded-md px-2 has-[input:focus]:ring has-[input:focus]:border-indigo-500 has-[input:focus]:ring-indigo-500">

                            <PasswordIcon />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="block w-full"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                                placeholder="Digite sua senha..."
                                ref={passwordRef}
                            />
                            <EyeIcon onClick={passwordReveal}/>
                            <InputError message={errors.password} className="mt-2" />
                        </div>
                        <div className="block mt-4">
                            <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            <span className="ms-2 text-sm text-muted">Manter conectado</span>
                            </label>
                        </div>

                        <div className="flex items-center w-full justify-end mt-4">
                            <PrimaryButton className="w-full h-12 flex items-center justify-center font-extrabold bg-bluecard drop-shadow-card border-b-4 border-[#2673F8]" disabled={processing}>
                                Login
                            </PrimaryButton>
                        </div>

                        <div className='flex text-xs text-center text-textcard w-full items-center justify-center gap-2'>
                            <p>Não possui cadastro?</p>
                            <Link href={route('register')} className='text-bluecard underline'>
                            Cadastrar
                            </Link>
                        </div>

                        

                        {canResetPassword && (
                                <div className='flex text-xs text-center text-textcard w-full items-center justify-center gap-2'>
                            
                                <Link href={route('password.request')} className='text-bluecard underline'>
                                Esqueceu a senha?
                                </Link>
                            </div>
                                )}
                    </form>
                </div>
            </div>

            <div className='w-full bg-black/55 flex items-center justify-center'>
                
                    <LeafClover />
                
            </div>
            </main>
    );
}
