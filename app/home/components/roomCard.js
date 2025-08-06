import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RoomCard({ room, onDelete }) {

    const router = useRouter();

    const deleteRoom = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`/api/rooms/${room.id}`, {
                method: 'DELETE',
            });

            const data = await res.json();
            console.log(data);
            onDelete()
        } catch (error) {
            console.error('Error deleting room:', error);
        } finally {
            router.replace('/home');
            router.refresh();
        }
    };


    return (
        <div className="rounded-lg shadow-xl max-w-full flex flex-row">
            <img
                src={room.thumbnail_photo}
                alt={room.name}
                className="w-1/2 h-70 object-cover rounded-tl-2xl rounded-bl-2xl"
            />
            <div className='flex flex-col justify-between w-full'>
                <div className='px-4 py-10'>
                    <h2 className="text-xl font-semibold mt-2 uppercase">{room.name}</h2>
                    <p className="text-sm text-gray-500 mt-1">{room.description}</p>
                    <p className="text-gray-600">{room.capacity} orang</p>
                    <p className="text-gray-600">Rp {Number(room.hourly_price).toLocaleString('id-ID')}</p>
                </div>
                <div className='flex flex-row max-w-full p-5 gap-5'>

                    <div className='bg-green-600 w-40  rounded-md text-center p-2 text-white hover:bg-green-400'>
                        <Link href={`/room/${room.id}`} key={room.id}>Detailed</Link>
                    </div>
                    <button
                        type='submit'
                        onClick={deleteRoom}
                        className='bg-red-600 w-40  rounded-md text-center p-2 text-white hover:bg-red-400'>
                        Delete
                    </button>

                </div>
            </div>
        </div>
    );
}
