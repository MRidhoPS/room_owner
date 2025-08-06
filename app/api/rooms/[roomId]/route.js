import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import axiosInstance from '@/app/utils/axiosInstance';

export async function GET(req, { params }) {

    const context = await params;
    const roomId = context.roomId;
    try {
        const cookie = await cookies();
        const token = cookie.get('jwt')?.value;

        if (!token) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));

        const userId = payload.userId;

        const res = await axiosInstance.get(`/admin/rooms/${roomId}/${userId}`, {
            headers: {
                Cookie: `jwt=${token}`
            },
            withCredentials: true
        })

        // console.log(res.data);
        return NextResponse.json(res.data);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'Failed to fetch rooms' },
            { status: 500 }
        );
    }
}