import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

async function SearchResult({query}) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const resquest = await fetch(`${baseUrl}/api/place/${query}`);
    const result = await resquest.json();
    const data = result.response;
    return (
        <div className='px-10'>
            {data.map((item, index) => (
                <Link key={index} href={`/find/${item.id}`}>
                <div  className='bg-white m-10 rounded-md flex gap-5 p-3 shadow-lg'>
                    <Image src={item.BaseImg} height={1000} width={1000} alt='place name' className='h-70 w-90 rounded-xl p-1 ring-2 ring-black/50' />
                    <div className='flex flex-col gap-5 '>
                        <h2 className='font-semibold text-2xl'>{item.placeName}</h2>
                        <p>{item.about}</p>
                    </div>
                </div>
                </Link> 
            ))}
        </div>
    )
}

export default SearchResult