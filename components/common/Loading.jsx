import React from 'react'
import { BarLoader } from 'react-spinners'

export const Loading = () => {
    return (
        <div className="loading_container w-screen h-screen flex items-center justify-center">
            <div className="loading_box flex flex-col items-center justify-center">
                <div className='flex items-center gap-3 mb-5 text-[#333333]'>
                    <img src="/vite.svg" alt="nextAuth logo" className='w-8 h-8' />
                    <h2 className='text-3xl font-extrabold'>
                        <span className='text-[#6C63FF]'>Next</span>
                        Auth
                    </h2>
                </div>
                <BarLoader
                color='#333333'
                    width={'97%'}
                />
                <p className='mt-1 text-sm opacity-75 text-center'>Connecting to server...</p>
            </div>
        </div>
    )
}
