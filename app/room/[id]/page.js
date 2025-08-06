// 'use client'

// import Link from 'next/link';
// import { useParams } from 'next/navigation';
// import React, { useEffect, useState } from 'react';
// import Slider from 'react-slick';
// import axiosInstance from '@/app/utils/axiosInstance';


// export default function DetailRooms() {
//     const params = useParams();
//     const id = params?.id;


//     const [rooms, setRooms] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [selectedFiles, setSelectedFiles] = useState([]);
//     const [previews, setPreviews] = useState([]);
//     const [token, setToken] = useState(null);

//     useEffect(() => {
//         setToken(document.cookie);
//         const fetchDetail = async () => {
//             try {
//                 const res = await fetch(`/api/rooms/${id}`, { method: 'GET' });
//                 const json = await res.json();

//                 if (!json.data) {
//                     setRooms('Empty');
//                 } else {
//                     setRooms(json.data);
//                 }
//             } catch (err) {
//                 console.error('Failed to fetch rooms:', err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (id) fetchDetail();
//     }, [id]);

//     const handleFileChange = (e) => {
//         const files = Array.from(e.target.files);
//         setSelectedFiles(files);

//         console.log(files);

//         const newPreviews = files.map(file => URL.createObjectURL(file));
//         setPreviews(newPreviews);
//     };

//     const handleSave = async () => {
//         if (!selectedFiles.length) return;

//         const formData = new FormData();
//         selectedFiles.forEach(file => formData.append('photos', file));

//         try {
//             const res = await axiosInstance.post(`/admin/rooms/${id}/photos`, formData, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'multipart/form-data'
//                 },
//                 withCredentials: true,
//             });

//             const data = res.data;
//             console.log('Uploaded:', data);


//             const refreshed = await fetch(`/api/rooms/${id}`);
//             const refreshedJson = await refreshed.json();
//             setRooms(refreshedJson.data);
//             setSelectedFiles([]);
//             setPreviews([]);
//         } catch (err) {
//             console.error('Failed to upload images:', err);
//         }
//     };


//     if (loading) return <p>Loading...</p>;
//     if (rooms === 'Empty') return <p>Data not found.</p>;

//     const settings = {
//         dots: true,
//         arrow: false,
//         infinite: true,
//         speed: 500,
//         slidesToScroll: 1,
//         autoplay: true,
//         autoplaySpeed: 2000,
//         cssEase: "linear",
//         pauseOnHover: true,
//         pauseOnFocus: true,
//     };

//     return (
//         <div className='flex flex-col w-full p-10'>
//             <Link href={'/home'} replace>Home</Link>

//             <div className="mt-6">
//                 {rooms.photos.length === 0 && previews.length === 0 ? (
//                     <div className="mt-4 flex text-sm/6 text-gray-600">
//                         <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500">
//                             <span>Upload a file</span>
//                             <input
//                                 multiple
//                                 type="file"
//                                 accept="image/*"
//                                 name="file-upload"
//                                 className="sr-only"
//                                 onChange={handleFileChange}
//                             />
//                         </label>
//                         <p className="pl-1">or drag and drop</p>
//                     </div>
//                 ) : previews.length > 0 ? (
//                     <div className='mt-4'>
//                         <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
//                             {previews.map((src, index) => (
//                                 <img key={index} src={src} className="w-full h-40 object-cover rounded-lg shadow" />
//                             ))}
//                         </div>
//                         <button
//                             onClick={handleSave}
//                             className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-400 transition"
//                         >
//                             Save
//                         </button>
//                     </div>
//                 ) : (
//                     <Slider {...settings}>
//                         {(rooms.photos || []).map((photo, index) => (
//                             <div key={index} className="px-2">
//                                 <img
//                                     src={photo}
//                                     alt={`Room photo ${index + 1}`}
//                                     className="w-full h-100 object-fill rounded-lg shadow"
//                                 />
//                             </div>
//                         ))}
//                     </Slider>
//                 )}
//             </div>

//             <div className='p-2 flex flex-col gap-2'>
//                 <h1 className='pt-10 font-bold uppercase text-2xl pb-2'>{rooms.name}</h1>
//                 <div>
//                     <p className='text-gray-500'>Description:</p>
//                     <h2>{rooms.description}</h2>
//                 </div>
//                 <div>
//                     <p className='text-gray-500'>Room Capacity:</p>
//                     <h3>{rooms.capacity} Persons</h3>
//                 </div>
//                 <div>
//                     <p className='text-gray-500'>Hourly Price:</p>
//                     <h4 className="text-gray-600">Rp {Number(rooms.hourly_price).toLocaleString('id-ID')} / hour</h4>
//                 </div>

//                 <div>
//                     <p className='text-gray-500'>Facilities: </p>
//                     {(rooms.facilities.length === 0 ? <p>Empty Facilities</p> : (
//                         <div>
//                             {(rooms.facilities || []).map((facility, index) => (
//                                 <div key={index}>
//                                     <p>{index + 1}. {facility}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     ))}
//                 </div>

//                 <div className='flex w-full h-12 rounded-2xl bg-green-600 hover:bg-green-400 transition delay-75 items-center justify-center'>
//                     <Link href={`/room/edit/${rooms.id}`} className='text-center text-white'>Edit Room</Link>
//                 </div>
//             </div>
//         </div>
//     );
// }

'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import axiosInstance from '@/app/utils/axiosInstance';

export default function DetailRooms() {
    const params = useParams();
    const id = params?.id;

    const [rooms, setRooms] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [token, setToken] = useState(null);

    // Facilities state
    const [facilityInput, setFacilityInput] = useState('');
    const [facilityList, setFacilityList] = useState([]);
    const [facilitiesMessage, setFacilitiesMessage] = useState('');

    useEffect(() => {
        setToken(document.cookie);
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

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviews(newPreviews);
    };

    const handleSave = async () => {
        if (!selectedFiles.length) return;

        const formData = new FormData();
        selectedFiles.forEach(file => formData.append('photos', file));

        try {
            const res = await axiosInstance.post(`/admin/rooms/${id}/photos`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true,
            });

            const data = res.data;
            console.log('Uploaded:', data);

            const refreshed = await fetch(`/api/rooms/${id}`);
            const refreshedJson = await refreshed.json();
            setRooms(refreshedJson.data);
            setSelectedFiles([]);
            setPreviews([]);
        } catch (err) {
            console.error('Failed to upload images:', err);
        }
    };

    const handleAddFacility = () => {
        if (facilityInput.trim()) {
            setFacilityList([...facilityList, facilityInput.trim()]);
            setFacilityInput('');
        }
    };

    const handleSubmitFacilities = async () => {
        if (facilityList.length === 0) {
            setFacilitiesMessage('Harap tambahkan fasilitas terlebih dahulu.');
            return;
        }

        try {
            const res = await axiosInstance.post(`/admin/rooms/${id}/facilities`, {
                facilities: facilityList
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            });

            setFacilitiesMessage('Fasilitas berhasil ditambahkan.');

            // Refresh detail room
            const refreshed = await fetch(`/api/rooms/${id}`);
            const refreshedJson = await refreshed.json();
            setRooms(refreshedJson.data);

            setFacilityList([]);
        } catch (err) {
            console.error('Gagal menambahkan fasilitas:', err);
            setFacilitiesMessage('Gagal menambahkan fasilitas.');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (rooms === 'Empty') return <p>Data not found.</p>;

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

    return (
        <div className='flex flex-col w-full p-10'>
            <Link href={'/home'} replace>Home</Link>

            {/* Upload Foto */}
            <div className="mt-6">
                {rooms.photos.length === 0 && previews.length === 0 ? (
                    <div className="mt-4 flex text-sm/6 text-gray-600">
                        <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 hover:text-indigo-500">
                            <span>Upload a file</span>
                            <input
                                multiple
                                type="file"
                                accept="image/*"
                                className="sr-only"
                                onChange={handleFileChange}
                            />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                    </div>
                ) : previews.length > 0 ? (
                    <div className='mt-4'>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                            {previews.map((src, index) => (
                                <img key={index} src={src} className="w-full h-40 object-cover rounded-lg shadow" />
                            ))}
                        </div>
                        <button
                            onClick={handleSave}
                            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-400 transition"
                        >
                            Save
                        </button>
                    </div>
                ) : (
                    <Slider {...settings}>
                        {(rooms.photos || []).map((photo, index) => (
                            <div key={index} className="px-2">
                                <img
                                    src={photo}
                                    alt={`Room photo ${index + 1}`}
                                    className="w-full h-100 object-fill rounded-lg shadow"
                                />
                            </div>
                        ))}
                    </Slider>
                )}
            </div>

            {/* Info Detail */}
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

                {/* Existing Facilities */}
                <div>
                    <p className='text-gray-500'>Facilities: </p>
                    {(rooms.facilities.length < 3 ?
                        < div className="mt-6 border-t pt-4">
                            <h2 className="text-xl font-semibold mb-2">Tambah Fasilitas</h2>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    className="border border-gray-300 px-4 py-2 rounded w-full"
                                    placeholder="Contoh: AC, Wifi, Karaoke"
                                    value={facilityInput}
                                    onChange={(e) => setFacilityInput(e.target.value)}
                                />
                                <button
                                    onClick={handleAddFacility}
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
                                >
                                    Tambah
                                </button>
                            </div>

                            {facilityList.length > 0 && (
                                <ul className="mt-3 list-disc pl-6 text-sm text-gray-700">
                                    {facilityList.map((f, i) => (
                                        <li key={i}>{f}</li>
                                    ))}
                                </ul>
                            )}

                            <button
                                onClick={handleSubmitFacilities}
                                className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-500"
                            >
                                Kirim Fasilitas
                            </button>

                            {facilitiesMessage && (
                                <p className="mt-2 text-sm text-gray-600">{facilitiesMessage}</p>
                            )}
                        </div> : (
                            <div>
                                {(rooms.facilities || []).map((facility, index) => (
                                    <div key={index}>
                                        <p>{index + 1}. {facility}</p>
                                    </div>
                                ))}
                            </div>
                        ))}
                </div>



                <div className='flex w-full h-12 rounded-2xl bg-green-600 hover:bg-green-400 transition delay-75 items-center justify-center mt-6'>
                    <Link href={`/room/edit/${rooms.id}`} className='text-center text-white'>Edit Room</Link>
                </div>
            </div>
        </div>
    );
}
