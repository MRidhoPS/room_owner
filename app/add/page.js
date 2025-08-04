'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

export default function AddPage() {

    const [name, setName] = useState('');
    const [capacity, setCapacity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescipriton] = useState('');
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('capacity', capacity);
        formData.append('hourly_price', price);
        formData.append('description', description);
        formData.append('thumbnail', file);

        try {
            const res = await fetch('/api/addRooms', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.error('Error adding room:', error);
        } finally {
            setIsLoading(false);
            router.push('/home');
        }
    }

    return (
        <div className='flex flex-col p-7'>
            <h1>Add Room</h1>

            <form onSubmit={handleSubmit} className='flex flex-col gap-3 mt-5'>
                <div>
                    <label className="block text-sm/6 font-medium text-gray-900">Thumbnail Image</label>
                    <div className="mt-2 flex justify-center rounded-2xl border border-dashed border-gray-900/25 px-6 py-10">

                        {file == null ? (<div className="text-center">
                            <svg viewBox="0 0 24 24" fill="currentColor" data-slot="icon" aria-hidden="true" className="mx-auto size-12 text-gray-300">
                                <path d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" />
                            </svg>
                            <div className="mt-4 flex text-sm/6 text-gray-600">
                                <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500">
                                    <span>Upload a file</span>
                                    <input type="file" name="file-upload" className="sr-only" onChange={(e) => setFile(e.target.files[0])} />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs/5 text-gray-600">PNG, JPG, GIF max 2MB</p>
                        </div>) : (<div className="text-center">
                            <img src={URL.createObjectURL(file)} alt="preview" className="mx-auto mt-2 w-full h-50" />
                        </div>)}
                    </div>
                </div>
                <div>
                    <label className="block text-sm/6 font-medium text-gray-900">Name</label>
                    <input
                        type="text"
                        className="border w-full p-2 rounded-lg border-gray-400"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm/6 font-medium text-gray-900">Capacity</label>

                    <input
                        type="text"
                        className="border w-full p-2 rounded-lg border-gray-400"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm/6 font-medium text-gray-900">Hourly Price</label>

                    <input
                        type="text"
                        className="border w-full p-2 rounded-lg border-gray-400"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm/6 font-medium text-gray-900">Description</label>

                    <input
                        type="text"
                        className="border w-full p-2 rounded-lg border-gray-400"
                        value={description}
                        onChange={(e) => setDescipriton(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Add Room
                </button>
            </form>
        </div>
    )
}
