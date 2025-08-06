import { NextResponse } from "next/server";
import axiosInstance from '@/app/utils/axiosInstance';
import { cookies } from "next/headers";
import { jwtVerify } from "jose"
import axios from "axios";




export async function PUT(req) {
    try {
        const cookie = await cookies();
        const token = cookie.get('jwt')?.value;

        if (!token) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));

        const userId = payload.userId;

        const formData = await req.formData();

        const id = formData.get('id');
        const name = formData.get('name');
        const capacity = formData.get('capacity');
        const hourly_price = formData.get('hourly_price');
        const description = formData.get('description');

        const axiosFormData = new FormData();
        axiosFormData.append('id', id);
        axiosFormData.append('name', name);
        axiosFormData.append('capacity', capacity);
        axiosFormData.append('hourly_price', hourly_price);
        axiosFormData.append('description', description);

        const res = await axiosInstance.put(`/admin/rooms/${id}`, axiosFormData, {
            headers: {
                Cookie: `jwt=${token}`,
            },
            withCredentials: true
        });

        console.log("update res: ", res.data)

        return NextResponse.json(res.data);
    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to add rooms' },
            { status: 500 }
        );
    }
}

export async function GET() {

    try {
        const cookie = await cookies();
        const token = cookie.get('jwt')?.value;

        // console.log("token: ", token);

        if (!token) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }



        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));

        const userId = payload.userId;

        // console.log("userId: ", userId);

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