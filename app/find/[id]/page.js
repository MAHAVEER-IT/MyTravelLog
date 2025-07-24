import PlaceDetailPage from '@/app/components/PlaceDetailPage'
import React from 'react'

async function page({params}) {
  const {id} = await params;

  return (
    <div>
        <PlaceDetailPage id={id}/>
    </div>
  )
}

export default page