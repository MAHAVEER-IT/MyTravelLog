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
                    <div key={index} className='mx-2 my-4 sm:m-6 md:m-10 bg-white h-auto sm:h-20 rounded-md shadow-lg flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-3 p-3 sm:p-0'>
                        <Image src={item.BaseImg} height={1000} width={1000} alt={item.placeName} className='h-16 w-full sm:w-30 bg-green-300 ring-1 ring-gray-300 dark:ring-gray-500 rounded-sm object-cover sm:m-4' />
                        <h3 className='font-bold text-sm sm:text-base'>PLACE : {item.placeName}</h3>
                        <h4 className='text-xs sm:text-sm'>Surrounding : {item.nearBy}</h4>
                        <button onClick={() => { handleDelete(item.id) }} className='p-1 bg-red-300 rounded-md text-white/80 h-10 sm:h-15 w-full sm:w-auto sm:m-4 hover:bg-red-500 hover:cursor-pointer text-sm sm:text-base'>Delete</button>
                    </div>
                ))
            )
            }

            {
               ( !session || session.user?.email != 'mahaveer.k2023it@sece.ac.in') && (<div className='py-5 sm:py-10 text-center text-xl sm:text-2xl md:text-4xl font-bold text-red-500'>This Page is only for Admin</div>)
            }
        </div>
    )
}

export default AdminDashbord