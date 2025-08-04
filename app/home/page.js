'use client'

import React, { useEffect, useState } from 'react'
import { logout } from '../utils/auth'
import { useRouter } from 'next/navigation'
import axios from '@/app/utils/axiosInstance';
import Link from 'next/link';
import RoomCard from './components/roomCard';

export default function HomePage() {

    const router = useRouter();

    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const res = await fetch('/api/rooms', { method: 'GET' })


                const json = await res.json();

                if (!json.data || json.data.length === 0) {
                    setRooms('Empty');
                } else {
                    setRooms(json.data);
                }
            } catch (err) {
                console.error('Failed to fetch rooms:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="p-4">
            <button onClick={() => logout(router)}>Logout</button>

            <h1 className="text-xl font-bold mb-4">List Rooms</h1>
            <Link className='text-xl font-bold mb-4 text-green-600' href={'/add'}>Add Rooms</Link>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {Array.isArray(rooms) && rooms.length > 0 ? (
                    rooms.map((room, index) => (
                        <RoomCard key={index} room={room} />
                    ))
                ) : (
                    <p className="text-gray-500">Tidak ada ruangan tersedia.</p>
                )}
            </div>

        </div>
    );
}
