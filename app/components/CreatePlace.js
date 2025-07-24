'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react'


const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dkn3it92b/image/upload'
const UPLOAD_PRESET = 'mahaveer_k'

function CreatePlace() {
    const { data: session } = useSession();
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')


    const uploadToCloudinary = async (image) => {
        const formData = new FormData()
        formData.append('file', image)
        formData.append('upload_preset', UPLOAD_PRESET)

        const res = await fetch(CLOUDINARY_URL, {
            method: 'POST',
            body: formData
        })

        const data = await res.json()
        return data.secure_url
    }

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            setMessage('Uploading images...')


            const baseImgUrl = await uploadToCloudinary(data.BaseImg[0])

            console.log("BaseImg File:", data.BaseImg[0])



            const imgUrls = await Promise.all(
                Array.from(data.imgURL).map(file => uploadToCloudinary(file))
            )


            const labelsArray = data.labels
                .split(',')
                .map(label => label.trim())
                .filter(Boolean)


            const payload = {
                placeName: data.placeName,
                nearBy: data.nearBy,
                BaseImg: baseImgUrl,
                BestTime: data.BestTime,
                imgURL: imgUrls,
                about: data.about,
                content: data.content,
                labels: labelsArray
            }
            
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
            const resquest = await fetch(`${baseUrl}/api/place`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })

            console.log('Final Payload:', resquest);
            setMessage('Form submitted successfully')
            reset()
        } catch (error) {
            console.error('Upload error:', error)
            setMessage('Error uploading. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            {session && session.user?.email == 'mahaveer.k2023it@sece.ac.in' && (
                <div className='m-5 max-w-2xl mx-auto p-6 bg-white shadow rounded'>
                    <h2 className='text-2xl font-semibold mb-6'>Add a New Place</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                        <input type="text" placeholder='Place Name' {...register('placeName', { required: true })} className='w-full p-2 border rounded' />
                        <input type="text" placeholder='Nearby' {...register('nearBy', { required: true })} className='w-full p-2 border rounded' />
                        <input type="text" placeholder='Best Time to Visit' {...register('BestTime', { required: true })} className='w-full p-2 border rounded' />
                        <input type="text" placeholder='Labels (comma separated, e.g., hill station, nature)' {...register('labels', { required: true })} className='w-full p-2 border rounded' />
                        <label className='block font-medium'>Base Image:</label>
                        <input type="file" accept='image/*' {...register('BaseImg', { required: true })} className='w-full p-2 border rounded' />
                        <label className='block font-medium'>Upload 4 Images:</label>
                        <input type="file" accept='image/*' multiple {...register('imgURL', { required: 'At least one image is required', validate: files => files.length <= 4 || 'Upload up to 4 images only' })} className='w-full p-2 border rounded' />
                        {errors.imgURL && <p className='text-red-600'>{errors.imgURL.message}</p>}
                        <textarea placeholder='About the place' {...register('about', { required: true })} className='w-full p-2 border rounded h-28' />
                        <textarea placeholder='Content' {...register('content', { required: true })} className='w-full p-2 border rounded h-40' />
                        <button type='submit' disabled={loading} className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'> {loading ? 'Uploading...' : 'Submit'} </button>
                        {message && <p className='text-center mt-2 text-sm'>{message}</p>}
                    </form>
                </div>
            )}
            {( !session || session.user?.email != 'mahaveer.k2023it@sece.ac.in') && (<div className='py-10 text-center text-4xl font-bold text-red-500'>This Page is only for Admin</div>)}
        </div>
    )
}

export default CreatePlace
