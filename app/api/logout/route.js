import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
    cookies().set({
        name: 'jwt',
        value: '',
        path: '/',
        maxAge: 0,
    });

    return NextResponse.json({ message: 'Logged out' });
}