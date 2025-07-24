'use client'
import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function HomePage() {
    const [result, setResult] = useState([])
    useEffect(()=>{
        const fetchData = async () => {
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
            const response = await fetch(`${baseUrl}/api/place`);
            const data = await response.json();
            const final = data.response;
            setResult(final);
        };
        fetchData();
    },[])
    
    return (
        <div className='p-3 flex flex-col flex-wrap gap-5'>
            <h2 className='text-4xl text-center font-bold  bg-radial-[at_50%_75%] from-green-400 via-teal-600 to-green-900 to-90% bg-clip-text text-transparent'>Explore More</h2>
            <div className='grid grid-cols-2 justify-between gap-4'>
                {result.map((item, index) => (
                    <Link key={index} href={`find/${item.id}`}>
                        <div className='h-70 w-180 bg-white rounded-md p-4 flex justify-center gap-4 items-center shadow-lg'>
                            <Image src={item.BaseImg} alt='img1' height={1000} width={1000} className='h-60 w-80 p-1 rounded-md ring-2 ring-gray-500' />
                            <div className='flex flex-col gap-1'>
                                <p className='font-semibold text-center'>{item.placeName}</p>
                                <p className='line-clamp-5'>{item.about}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default HomePage