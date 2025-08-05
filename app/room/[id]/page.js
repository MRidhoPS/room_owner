'use client'

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
        <div>
            <h1>{rooms.name}</h1>
            <h2>{rooms.description}</h2>
            <h3>{rooms.capacity}</h3>
            <h4>{rooms.hourly_price}</h4>

            <div>
                <p>Facilities: </p>
                {(rooms.facilities || []).map((facility, index)=>(
                    <div key={index}>
                        <p>{facility}</p>
                    </div>
                ))}
            </div>

            <div className="w-1/2">
                <Slider {...settings}>
                    {(rooms.photos || []).map((photo, index) => (
                        <div key={index} className="px-2">
                            <img
                                src={photo}
                                alt={`Room photo ${index + 1}`}
                                className="w-full h-48 object-cover rounded-lg shadow"
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}
