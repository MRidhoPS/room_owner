import React, { useState } from 'react'

export default function AddPage() {

    const [name, setName] = useState('');
    const [capacity, setCapacity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescipriton] = useState('');

    const handleSubmit = async (e) => { }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit }>
                <input
                    type="text"
                    placeholder="Name"
                    className="border w-full p-2 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Capacity"
                    className="border w-full p-2 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Hourly Price"
                    className="border w-full p-2 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Description"
                    className="border w-full p-2 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="file"
                    placeholder="Input FIle"
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
