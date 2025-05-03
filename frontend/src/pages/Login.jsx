import React from 'react';
import Logo_EsterilMed from '@/assets/Logo_EsterilMed.jpeg';

function Login() {
    return (
        <div className="min-h-screen bg-neutral-200 flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">

                {/* Brand logo */}
                <div className="text-center">
                    <img
                        alt="Logo de EsterilMed"
                        src={Logo_EsterilMed}
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-6 text-2xl font-bold tracking-tight text-gray-900">
                        {/*Iniciar sesión en EsterilMed*/}
                    </h2>
                </div>

                {/* Form to sign in */}
                <form action="#" method="POST" className="mt-8 space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                            Correo electrónico
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder={"bpuente@esterilmed.cl"}
                            autoComplete="email"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-esteril-blue"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            placeholder={"********"}
                            autoComplete="current-password"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-esteril-blue"
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <a href="mailto:correodeprueba@gmail.com" className="text-esteril-blue hover:text-esteril-blue-light font-semibold">
                            ¿Olvidó la contraseña?
                        </a>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full rounded-md bg-esteril-blue px-4 py-2 text-sm font-semibold text-white shadow hover:bg-esteril-blue-light focus:ring-2 focus:ring-offset-2 focus:ring-esteril-blue"
                        >
                            Iniciar Sesión
                        </button>
                    </div>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                    Necesito ayuda.{' '}
                    <a href="mailto:correodeprueba@gmail.com" className="font-semibold text-esteril-blue hover:text-esteril-blue-light">
                        Contactar a administración
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Login;
