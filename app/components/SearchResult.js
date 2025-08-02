import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

async function SearchResult({query}) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const resquest = await fetch(`${baseUrl}/api/place/${query}`);
    const result = await resquest.json();
    const data = result.response;
    return (
        <div className='px-2 sm:px-5 md:px-10'>
            {data.map((item, index) => (
                <Link key={index} href={`/find/${item.id}`}>
                <div className='bg-white my-4 sm:m-6 md:m-10 rounded-md flex flex-col md:flex-row gap-3 sm:gap-4 md:gap-5 p-3 shadow-lg'>
                    <Image src={item.BaseImg} height={1000} width={1000} alt='place name' className='h-40 sm:h-50 md:h-70 w-full md:w-90 rounded-xl p-1 ring-2 ring-black/50 object-cover' />
                    <div className='flex flex-col gap-2 sm:gap-3 md:gap-5'>
                        <h2 className='font-semibold text-lg sm:text-xl md:text-2xl'>{item.placeName}</h2>
                        <p className='text-sm sm:text-base line-clamp-3 md:line-clamp-none'>{item.about}</p>
                    </div>
                </div>
                </Link> 
            ))}
        </div>
    )
}

export default SearchResult