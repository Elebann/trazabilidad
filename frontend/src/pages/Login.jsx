import React, {useState} from 'react';
import Logo_EsterilMed from '@/assets/Logo_EsterilMed.jpeg';
import {userLogin} from "@/api/trazabilidad.api.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Login() {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        rut: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // API call to authenticate user
            const response = await userLogin(credentials);
            const accessToken = response.data.access;
            const refreshToken = response.data.refresh;
            // Store tokens in localStorage
            localStorage.setItem('access_token', accessToken);
            localStorage.setItem('refresh_token', refreshToken);

            // Decode the JWT to get user information.
            // this will work, but we are planing to use a more robust solution
            // todo consider to user AuthContext to store user data (better than this)
            const decodedToken = jwtDecode(accessToken);
            console.log("Token Decodificado:", decodedToken); // Para depurar y ver qué contiene

            const userData = {
                rut: decodedToken.user_id, // simple-jwt usualmente pone el ID del usuario (tu RUT) aquí
                nombre: decodedToken.nombre,
                rol_id: decodedToken.rol_id,
                rol: decodedToken.rol,
            };
            localStorage.setItem('user_data', JSON.stringify(userData));

            toast.success(`Hola ${userData.nombre}. Autenticado Correctamente.`);
            navigate('/index');
        } catch (err) {
            toast.error("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
            console.error('Error de login:', err);
        }
    };

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
                </div>

                {/* Form to sign in */}
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    {error && (
                        <div className="text-red-600 text-sm font-medium">{error}</div>
                    )}

                    <div>
                        <label htmlFor="rut" className="block text-sm font-medium text-gray-900">
                            RUT
                        </label>
                        <input
                            id="rut"
                            name="rut"
                            type="text"
                            required
                            value={credentials.rut}
                            onChange={handleChange}
                            placeholder="Ingresa tu RUT sin puntos ni guiones. 112223334"
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
                            value={credentials.password}
                            onChange={handleChange}
                            placeholder="********"
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
