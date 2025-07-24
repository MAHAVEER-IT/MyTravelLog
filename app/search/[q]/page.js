import SearchResult from '@/app/components/SearchResult'
import React from 'react'

async function page({params}) {
  const {q} = await params;
  return (
    <div>
        <SearchResult query={q}/>
    </div>
  )
}

export default page