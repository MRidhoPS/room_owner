'use client'

import React, { useState } from 'react'
import { loginUser } from '../utils/auth';
import { useRouter } from 'next/navigation';
import { Bounce, toast, ToastContainer } from 'react-toastify';

export default function Login() {

    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [passwordHidden, setPasswordHidden] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await loginUser(email, password);
            if (result.success) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                router.push('/home');
            }
            else {
                toast.error(result.message, {
                    transition: Bounce,
                    theme: "light",
                });
            }
        } catch (error) {
            toast.error(error, {
                transition: Bounce,
                theme: "light",
            });
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <div className='flex min-h-screen'>
            <div className='bg-blue-400 w-1/2 flex-col items-center justify-center p-10'>

                <img
                    src="/doctor-image.png"
                    alt="Healthcare"
                    className="max-w-xs mb-6"
                />
                <h1 className="text-4xl font-bold mb-4">Welcome to Healthcare</h1>
                <p className="text-sm text-center max-w-sm">
                    Access your patient records, view book appointments, and manage your
                    patients’ prescription history in one place.
                </p>
            </div>
            <div className="w-1/2 bg-gray-50 flex items-center justify-center p-10">
                <div className="w-full max-w-md space-y-6">
                    <h2 className="text-3xl font-bold text-gray-900">Login</h2>
                    <p className="text-sm text-gray-600">
                        Enter your credentials to access your account and explore more
                    </p>
                    <form className="space-y-4" onSubmit={handleLogin}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                className="mt-1 w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type={passwordHidden ? "text" : "password"}
                                className="mt-1 w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2" onChange={() => setPasswordHidden((prev) => !prev)} />
                                Show password
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
                        >
                            {isLoading ? "Loading ..." : "Sign in"}
                        </button>

                    </form>
                    <ToastContainer/>
                </div>
            </div>
        </div>
    )
}
