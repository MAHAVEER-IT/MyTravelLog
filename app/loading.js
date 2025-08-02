import React from 'react'

function loading() {
    return (
        <div className="flex items-center justify-center h-screen w-full px-4">
            <div className="loader w-16 h-16 md:w-24 md:h-24 animate-spin border-4 border-gray-300 border-t-green-600 rounded-full"></div>
        </div>
    )
}

export default loading