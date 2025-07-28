'use client'

import React from 'react'
import { logout } from '../utils/auth'
import { useRouter } from 'next/navigation'

export default function Home() {

    const router = useRouter();
    return (
        <>
            <div>Home</div>
            <button onClick={()=>logout(router)}>Logout</button>
        </>
    )
}
