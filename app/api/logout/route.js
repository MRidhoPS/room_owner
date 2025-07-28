import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
    const response = NextResponse.json({ message: 'Logout successful' });

    response.cookies.set({
        name: 'jwt',
        value: '',
        path: '/',
        expires: new Date(0),
        httpOnly: true,
    });

    return response;
}