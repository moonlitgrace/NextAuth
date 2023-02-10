import Head from 'next/head'
import React from 'react'
import { BeatLoader } from 'react-spinners'
import { motion } from 'framer-motion'

export const Loading = () => {
    return (
        <>
            <Head>
                <title>Connecting to server...</title>
            </Head>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                    duration: 0.2
                }}
                className="loading_container w-screen h-screen flex items-center justify-center z-50 absolute inset-0 bg-black/75">
                <div className="loading_box flex flex-col items-center justify-center">
                    {/* <div className='flex items-center gap-3 mb-5 text-white'>
                    <Image src={ViteSvg} alt="nextAuth logo" className='w-8 h-8' />
                    <h2 className='text-3xl font-extrabold'>
                        <span className=''>Next</span>
                        Auth
                    </h2>
                </div> */}
                    <BeatLoader
                        color='white'
                        width={'97%'}
                    />
                    <p className='mt-2 text-sm opacity-75 text-center text-white'>Please wait a moment...</p>
                </div>
            </motion.div>
        </>
    )
}
