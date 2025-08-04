import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import axiosInstance from '@/app/utils/axiosInstance';
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const cookie = await cookies();
        const token = cookie.get('jwt')?.value;

        if (!token) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET))

        const userId = payload.userId;

        const formData= await req.formData();

        const name = formData.get('name');
        const capacity = formData.get('capacity');
        const hourly_price = formData.get('hourly_price');
        const description = formData.get('description');
        const file = formData.get('thumbnail');

        const axiosFormData = new FormData();
        axiosFormData.append('admin_id', userId);
        axiosFormData.append('name', name);
        axiosFormData.append('capacity', capacity);
        axiosFormData.append('hourly_price', hourly_price);
        axiosFormData.append('description', description);
        axiosFormData.append('thumbnail', file);

        const res = await axiosInstance.post('/admin/rooms', axiosFormData, {
            headers: {
                Cookie: `jwt=${token}`,
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        });

        console.log("res: ", res.data)

        return NextResponse.json(res.data);
    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to add rooms' },
            { status: 500 }
        );
    }
}