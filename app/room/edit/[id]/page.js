'use client'

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

export default function EditPage() {


    const router = useRouter();
    const params = useParams();
    const id = params?.id;

    const [rooms, setRooms] = useState(null);
    const [loading, setLoading] = useState(true);

    const [name, setName] = useState('');
    const [capacity, setCapacity] = useState();
    const [price, setPrice] = useState('');
    const [description, setDescipriton] = useState('');

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('id', id);
        formData.append('name', name);
        formData.append('capacity', capacity);
        formData.append('hourly_price', price);
        formData.append('description', description);

        try {
            const res = await fetch(`/api/rooms`, {
                method: 'PUT',
                body: formData,
            });

            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.error('Error adding room:', error);
        } finally {
            setLoading(false);
            router.replace(`/room/${id}`);
        }
    }

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await fetch(`/api/rooms/${id}`, { method: 'GET' });
                const json = await res.json();
                const data = json.data;

                if (!json.data) {
                    setRooms('Empty');
                } else {
                    setRooms(data);
                    setName(data.name);
                    setCapacity(data.capacity);
                    setPrice(data.hourly_price);
                    setDescipriton(data.description);
                }
            } catch (err) {
                console.error('Failed to fetch rooms:', err);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchDetail();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (rooms === 'Empty') return <p>Data not found.</p>;
    return (
        <div className='flex flex-col w-full p-10'>
            <form onSubmit={handleUpdate} className='p-2 flex flex-col gap-2'>
                <h1 className='pt-10 font-bold uppercase text-2xl pb-2'>Edit Data Room</h1>
                <div>
                    <p className='text-gray-500'>Name:</p>
                    <input
                        type='text'
                        className='border rounded-sm w-full p-2 border-gray-300'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <p className='text-gray-500'>Description:</p>
                    <input
                        type='text'
                        className='border rounded-sm w-full p-2 border-gray-300'
                        value={description}
                        onChange={(e) => setDescipriton(e.target.value)}
                    />
                </div>
                <div>
                    <p className='text-gray-500'>Capacity:</p>
                    <input
                        type='text'
                        className='border rounded-sm w-full p-2 border-gray-300'
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                    />
                </div>
                <div>
                    <p className='text-gray-500'>Hourly Price:</p>
                    <input
                        type='text'
                        className='border rounded-sm w-full p-2 border-gray-300'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>

                <button

                    type='submit'
                    className='flex w-full h-12 rounded-2xl bg-green-600 hover:bg-green-500 text-white items-center justify-center mt-4'
                >
                    Save
                </button>
            </form>


        </div>
    );
}
