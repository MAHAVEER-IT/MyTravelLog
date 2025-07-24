'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image';

function AdminDashbord() {
    const { data: session } = useSession();
    const [result, setResult] = useState([])
    

    useEffect(() => {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        fetch(`${baseUrl}/api/place`)
            .then(res => res.json())
            .then(data => setResult(data.response))
    }, [])

    const handleDelete = async (id) => {
        const res = await fetch(`${baseUrl}/api/place/${id}`, {
            method: 'DELETE'
        });
        const data = await res.json();
        console.log(data);
    };

    return (
        <div>
            {session && session.user?.email == 'mahaveer.k2023it@sece.ac.in' && (
                result.map((item, index) => (
                    <div key={index} className='m-10 bg-white h-20 rounded-md shadow-lg flex justify-between items-center gap-3'>
                        <Image src={item.BaseImg} height={1000} width={1000} alt={item.placeName} className='m-4 h-16 w-30 bg-green-300 ring-1 ring-gray-300 dark:ring-gray-500 rounded-sm' />
                        <h3 className='font-bold'>PLACE : {item.placeName}</h3>
                        <h4>Surrounding : {item.nearBy}</h4>
                        <button onClick={() => { handleDelete(item.id) }} className='p-1 bg-red-300 rounded-md text-white/80 h-15 m-4 hover:bg-red-500 hover:cursor-pointer'>Delete</button>
                    </div>
                ))
            )
            }

            {
               ( !session || session.user?.email != 'mahaveer.k2023it@sece.ac.in') && (<div className='py-10 text-center text-4xl font-bold text-red-500'>This Page is only for Admin</div>)
            }
        </div>

    )
}

export default AdminDashbord