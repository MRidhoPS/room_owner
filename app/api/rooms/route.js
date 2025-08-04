import { NextResponse } from "next/server";
import axiosInstance from '@/app/utils/axiosInstance';
import { cookies } from "next/headers";
import { jwtVerify } from "jose"

export async function GET() {

    try {
        const cookie = await cookies();
        const token = cookie.get('jwt')?.value;

        // console.log("token: ", token);

        if (!token) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        // console.log('JWT_SECRET', process.env.JWT_SECRET);


        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));

        const userId = payload.userId;

        console.log("userId: ", userId);

        const res = await axiosInstance.get(`/admin/rooms/${userId}`, {
            headers: {
                Cookie: `jwt=${token}`
            },
            withCredentials: true
        });

        return NextResponse.json(res.data);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'Failed to fetch rooms' },
            { status: 500 }
        );
    }
}