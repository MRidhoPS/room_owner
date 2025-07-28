import Image from 'next/image';

export default function RoomCard({ room }) {
    return (
        <div className="border rounded-lg shadow-md p-4 max-w-sm">
            <img
                src={room.thumbnail_photo}
                alt={room.name}
                className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-xl font-semibold mt-2">{room.name}</h2>
            <p className="text-gray-600">Kapasitas: {room.capacity} orang</p>
            <p className="text-gray-600">Harga per jam: Rp {Number(room.hourly_price).toLocaleString('id-ID')}</p>
            <p className="text-sm text-gray-500 mt-1">{room.description}</p>
        </div>
    );
}
