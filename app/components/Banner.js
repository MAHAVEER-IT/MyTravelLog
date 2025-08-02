'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Banner() {
    const [i, setI] = useState(0)
    const [result, setResult] = useState([])

    useEffect(() => {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        fetch(`${baseUrl}/api/place/banner`)
            .then(res => res.json())
            .then(data => setResult(data.response))
    }, [])

    const handlePrev = () => {
        setI(prev => (prev === 0 ? result.length - 1 : prev - 1))
    }

    const handleNext = () => {
        setI(prev => (prev === result.length - 1 ? 0 : prev + 1))
    }

    if (result.length === 0) {
        return (
        <div className='relative h-60 sm:h-80 md:h-100 lg:h-120 bg-gray-300 rounded-xl animate-pulse'>
            <div className='absolute inset-0 flex flex-col justify-center items-center gap-2 sm:gap-4 bg-black/30 rounded-b-xl px-4'>
                <div className='h-6 sm:h-8 bg-gray-400 rounded w-32 sm:w-48'></div>
                <div className='h-3 sm:h-4 bg-gray-400 rounded w-64 sm:w-80 md:w-96'></div>
            </div>
        </div>
    );
    }

    return (
        <div className='relative h-60 sm:h-80 md:h-100 lg:h-120 bg-green-600 rounded-xl'>
            <Image src={result[i].BaseImg} alt='place banner' height={1000} width={1000} className='h-full w-full object-cover rounded-b-xl' />
            <div className='absolute inset-0 flex flex-col justify-center items-center gap-2 sm:gap-4 bg-black/30 rounded-b-xl px-4'>
                <h1 className='text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center'>
                    {result[i].placeName}
                </h1>
                <p className='text-white text-xs sm:text-sm md:text-base px-2 sm:px-10 md:px-20 lg:px-40 text-center'>
                    {result[i].about}
                </p>
            </div>
            <button onClick={handlePrev} className='absolute left-2 sm:left-4 top-1/2 bg-white/60 rounded-full hover:bg-white hover:cursor-pointer'>
                <ChevronLeft className='h-4 w-4 sm:h-6 sm:w-6' />
            </button>
            <button onClick={handleNext} className='absolute right-2 sm:right-4 top-1/2 bg-white/60 rounded-full hover:bg-white hover:cursor-pointer'>
                <ChevronRight className='h-4 w-4 sm:h-6 sm:w-6' />
            </button>
        </div>
    )
}

export default Banner
