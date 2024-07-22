import { useEffect, useRef } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import Mail from '@/Components/Mail';
import PasswordIcon from '@/Components/PasswordIcon';
import UserCircle from '@/Components/UserCircle';
import EyeIcon from '@/Components/EyeIcon';
import LeafClover from '@/Components/LeafClover';

export default function Register() {
    const passwordRef = useRef(null);
    const passwordConfirmationRef = useRef(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    const passwordReveal = () => {
        passwordRef.current.type = passwordRef.current.type === 'password' ? 'text' : 'password';
    }

    const passwordConfirmationReveal = () => {
        passwordConfirmationRef.current.type = passwordConfirmationRef.current.type === 'password' ? 'text' : 'password';
    }

    return (
        <main className='flex min-h-screen relative z-10'>
            <div className=' absolute inset-0 w-full h-full -z-10 bg-[#1B1D24]'>
                <img src="/banner.jpeg" alt="" className='size-full object-fill mix-blend-luminosity' />
            </div>
            <Head title="Register" />

            <div className='w-full bg-backgroundnav flex flex-col'>
                <div >
                    <div className='font-kanit font-[600] text-[#4889F9] text-3xl ml-28 py-5'>Jackteam.</div>
                </div>

                <div className='flex-col flex w-full h-full px-28 mt-36 gap-8'>
                    <div>
                        <h1 className='text-3xl font-kanit text-textcard font-bold'>Obrigado pelo interesse de efetuar seu cadastro.</h1>
                        <p className='text-muted text-xs'>Preencha os dados corretamente e comece a ganhar dinheiro</p>
                    </div>
                    
                    <form onSubmit={submit} className='flex flex-col gap-2'>    
                        <div className="flex items-center has-[input:focus]:[&_svg]:text-indigo-500 bg-background1 rounded-md px-2 has-[input:focus]:ring has-[input:focus]:border-indigo-500 has-[input:focus]:ring-indigo-500">

                            <UserCircle className='peer-focus:text-red-800'/>
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="block w-full peer"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                placeholder="Digite um nome de usuario..."
                                
                                
                            />

                            <InputError message={errors.name} className="mt-2" />
                        </div>

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
                                placeholder="Digite um email..."
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
                                placeholder="Digite uma senha..."
                                ref={passwordRef}
                            />
                            <EyeIcon onClick={passwordReveal}/>
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="flex items-center bg-background1 rounded-md px-2 has-[input:focus]:ring has-[input:focus]:border-indigo-500 has-[input:focus]:ring-indigo-500">

                            <PasswordIcon />
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className=" block w-full"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                                placeholder="Confirme a senha..."
                                ref={passwordConfirmationRef}
                            />
                            <EyeIcon onClick={passwordConfirmationReveal}/> 
                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>

                        <div className="flex items-center w-full justify-end mt-4">
                            <PrimaryButton className="w-full h-12 flex items-center justify-center font-extrabold bg-bluecard drop-shadow-card border-b-4 border-[#2673F8]" disabled={processing}>
                                Cadastrar
                            </PrimaryButton>
                        </div>

                        <div className='flex text-xs text-center text-textcard w-full items-center justify-center gap-2'>
                            <p>Já possui cadastro?</p>
                            <Link href={route('login')} className='text-bluecard underline'>
                            Fazer login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>

            <div className='w-full bg-black/55 flex items-center justify-center'>
                
                    <LeafClover />
                
            </div>
        </main>
    );
}
