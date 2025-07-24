'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Send, ChevronLeft, ChevronRight } from 'lucide-react'
import { useSession } from 'next-auth/react'

function PlaceDetailPage({ id }) {
    const { data: session } = useSession();
    const [data, setData] = useState({});
    const [commentText, setCommentText] = useState('');
    const [currentImage, setCurrentImage] = useState(0);

    const handleSubmitCommed = async (e) => {
        e.preventDefault();

        if (!commentText) {
            return alert('Please Enter Commeds');
        }

        if (!session) {
            return alert('user must be login to post a commeds');
        }

        const resquest = await fetch(`/api/place/${id}/commends/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: session.user?.name, comment: commentText })
        })

        console.log(resquest);

        if (resquest.ok) {
            setCommentText('');
            fetchData();
        } else {
            alert('fail to post comment');
        }
    }


    useEffect(() => {
        async function fetchData() {
            const resquest = await fetch(`/api/place/${id}`);
            const data = await resquest.json();
            const result = await data.response[0];
            setData(result);
        }

        fetchData();
    }, [id]);





    const handlePrev = () => {
        setCurrentImage((prev) => (prev === 0 ? data.imgURL.length - 1 : prev - 1))
    }

    const handleNext = () => {
        setCurrentImage((prev) => (prev === data.imgURL.length - 1 ? 0 : prev + 1))
    }

    return (
        <div>
            <div className='h-120 bg-green-600 rounded-xl'>
                {(data.imgURL?.[currentImage] || data.BaseImg) ? (
                    <Image src={data.imgURL?.[currentImage] || data.BaseImg} alt={data.placeName} height={1000} width={1000} className='h-full w-full object-cover rounded-b-xl' />
                ) : null}

                {data.imgURL?.length > 1 && (<>
                    <button onClick={handlePrev} className='absolute left-4 top-1/2 bg-white/60 rounded-full hover:bg-white hover:cursor-pointer'>
                        <ChevronLeft className='h-6 w-6' />
                    </button>
                    <button onClick={handleNext} className='absolute right-4 top-1/2 bg-white/60 rounded-full hover:bg-white hover:cursor-pointer'>
                        <ChevronRight className='h-6 w-6' />
                    </button>
                </>)}
            </div>
            <h2 className='text-3xl font-black text-center py-2'>{data?.placeName}</h2>
            <div className='flex justify-center items-center gap-5 py-2'>
                <div className='outline-2 outline-teal-600 font-semibold px-4 p-2 bg-linear-to-r from-white to-green-300 rounded-2xl'><p>Surrounding : {data.nearBy}</p></div>
                <div className='outline-2 outline-teal-600 font-semibold px-4 p-2 bg-linear-to-r from-white to-green-300 rounded-2xl'><p>Best Time : {data.BestTime}</p></div>
            </div>
            <h2 className='text-3xl font-black p-4'>About</h2>
            <p className='bg-white p-4 text-lg whitespace-pre-line'>{data?.content}</p>
            <div className='py-2 px-5'>
                <h3 className='text-center text-xl text-white bg-black/50 m-3 rounded-2xl'>Share Your through</h3>
                <div className='bg-green-100 p-2 px-5 rounded-md outline-2 outline-teal-800'>
                    <div className=' h-60 overflow-y-auto'>
                        {data?.comments?.map((item, index) => (
                            <div key={index} className='m-5'>
                                <div className='flex gap-3'>
                                    <div className='rounded-full bg-green-500 h-6 w-6 text-center font-semibold text-white ring-2 ring-green-600'>{item.name.charAt(0).toUpperCase()}</div>
                                    <p className='font-semibold'>{item.name}</p>
                                </div>
                                <p className='px-10'>{item.comment}</p>
                                <div />
                            </div>
                        ))}
                    </div>
                    <div className='flex gap-3 justify-center items-center'>
                        <input placeholder='share your thougth' className='px-5 outline-2 outline-black/50 w-300 rounded-md h-8 placeholder:fill-white' value={commentText} onChange={(e) => { setCommentText(e.target.value) }} />
                        <button onClick={handleSubmitCommed} className='rounded-full h-10 w-10 bg-green-300 ring-2 ring-teal-500'><Send className='m-1.5 h-6 w-6' /></button>
                    </div>
                </div>
            </div>
            <footer className="bg-black/60 text-white text-center">Developed by Mahaveer @2025 | LinkedIn</footer>
        </div>

    )
}

export default PlaceDetailPage