'use client'

import React, { useState } from 'react'
import { loginUser } from '../utils/auth';
import { useRouter } from 'next/navigation';

export default function Login() {

    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        const result = await loginUser(email, password);

        if (result.success) {
            setMsg('Login berhasil!');
            await new Promise(resolve => setTimeout(resolve, 1000));
            router.push('/home');
        }
        else {
            setMsg(result.message);
        }
    }


    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    className="border w-full p-2 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="border w-full p-2 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Login
                </button>
                {msg && <p className="text-sm text-center mt-2">{msg}</p>}
            </form>
        </div>
    )
}
