'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn, signOut, useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { set } from 'react-hook-form'

function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [searchText, setSearchText] = useState('');
    const [dropDown, setDropDown] = useState(false)

    const handleSearch = (e) => {
        if (e.key == 'Enter' && searchText.trim() !== '') {
            router.push(`/search/${searchText}`)
        }
    }

    const { data: session } = useSession();

    const handleSignIn = async (e) => {
        e.preventDefault();
        await signIn('github', { callbackUrl: '/' });
    }


    return (
        <>
            <nav className='bg-white p-4'>
                <ul className='flex justify-around'>
                    <Link href='/'>
                        <li className='font-semibold text-2xl flex gap-2'>
                            <div>MyTravelLog</div>
                            <Image src='/icon.png' alt='icon' height={100} width={100} className='h-10 w-10' />
                        </li>
                    </Link>
                    <li className='flex gap-3'>
                        <input placeholder='search' className='outline-3 outline-black w-200 rounded-md h-8 px-3' value={searchText} onChange={(e) => setSearchText(e.target.value)} onKeyDown={handleSearch} />
                        {(pathname == '/admin' && session && session.user?.email == 'mahaveer.k2023it@sece.ac.in') && (<Link href='/admin/add'><button className='bg-green-300 p-2 rounded-md px-3 ring-2 ring-green-500 hover:cursor-pointer hover:bg-green-600 text-white font-semibold text-center'>Create +</button></Link>)}
                    </li>
                    <li>
                        {!session && (<button className='bg-green-300 p-2 rounded-md px-3 ring-2 ring-green-500 hover:cursor-pointer hover:bg-green-600 text-white font-semibold' onClick={handleSignIn}>Login</button>)}
                        {session && (<Image src={session.user?.image} height={1000} width={1000} alt='your image' className='h-10 w-10 p-0.5 rounded-full ring-2 ring-gray-300 dark:ring-green-500 hover:dark:ring-green-700 hover:cursor-pointer' onClick={() => setDropDown(!dropDown)}/>)}
                        {dropDown && (
                            <div  className="absolute right-5 mt-2 z-10  bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600">
                                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                    <div>{session.user?.name}</div>
                                    <div className="font-medium truncate">{session.user?.email}</div>
                                </div>
                                <div className="py-1">
                                    <button onClick={()=>signOut()} className="block px-10 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white hover:cursor-pointer">Sign out</button>
                                </div>
                            </div>
                        )}
                    </li>
                </ul>
            </nav>
            <div className='h-2 bg-green-200'></div>
        </>
    )
}

export default Navbar