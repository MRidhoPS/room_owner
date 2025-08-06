'use client'

import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

export default function DetailRooms() {

    const settings = {
        dots: true,
        arrow: false,
        infinite: true,
        speed: 500,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "linear",
        pauseOnHover: true,
        pauseOnFocus: true,

    };

    const params = useParams();
    const id = params?.id;

    const [rooms, setRooms] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await fetch(`/api/rooms/${id}`, { method: 'GET' });
                const json = await res.json();

                if (!json.data) {
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

        if (id) fetchDetail();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (rooms === 'Empty') return <p>Data not found.</p>;

    return (
        <div className='flex flex-col w-full p-10'>
            <Link href={'/home'} replace>Home</Link>
            <div className="">
                {(rooms.photos.length == 0 ? <p className='pl-2'>Empty photos</p> : <Slider {...settings}>
                    {(rooms.photos || []).map((photo, index) => (
                        <div key={index} className="px-2">
                            <img
                                src={photo}
                                alt={`Room photo ${index + 1}`}
                                className="w-full h-100 object-fill rounded-lg shadow"
                            />
                        </div>
                    ))}
                </Slider>)}
            </div>
            <div className='p-2 flex flex-col gap-2'>
                <h1 className='pt-10 font-bold uppercase text-2xl pb-2'>{rooms.name}</h1>
                <div>
                    <p className='text-gray-500'>Description:</p>
                    <h2>{rooms.description}</h2>
                </div>
                <div>
                    <p className='text-gray-500'>Room Capacity:</p>
                    <h3>{rooms.capacity} Persons</h3>
                </div>
                <div>
                    <p className='text-gray-500'>Hourly Price:</p>
                    <h4 className="text-gray-600">Rp {Number(rooms.hourly_price).toLocaleString('id-ID')} / hour</h4>
                </div>

                <div>
                    <p className='text-gray-500'>Facilities: </p>
                    {(rooms.facilities.length == 0 ? <p>Empty Facilities</p> : <div>  {(rooms.facilities || []).map((facility, index) => (
                        <div key={index}>
                            <p>{index + 1}. {facility}</p>
                        </div>
                    ))}</div>)}
                </div>

                <div className='flex w-full h-12 rounded-2xl bg-green-600 hover:bg-green-400 transition delay-75 items-center justify-center'>
                    <Link href={`/room/edit/${rooms.id}`} className='text-center text-white'>Edit Room</Link>
                </div>
            </div>


        </div>
    );
}
