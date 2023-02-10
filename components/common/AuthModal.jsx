import React, { useContext } from 'react'
import Head from 'next/head'
import { AuthContext } from '@/contexts/AuthContext'
import { motion } from 'framer-motion'
import { SideImage } from './SideImage'
import { LoginComp } from '../LoginComp'
import { SignupComp } from '../SignupComp'
import { CgClose } from 'react-icons/cg'


export const AuthModal = () => {
    const {
        loginView,
        toggleAuthModal,
    } = useContext(AuthContext)

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.09 }}
        >
            <Head>
                <title>Login / Signup to NextAuth</title>
            </Head>
            <div className="auth_container flex items-center justify-center bg-black/25 w-screen h-screen absolute inset-0">
                <div className="auth_box flex lg:w-[56rem] md:w-[25rem] w-[21rem] md:h-[33rem] h-[30rem] items-center justify-center bg-white rounded-lg overflow-hidden drop-shadow-xl relative">

                    {/** showing login form or signup form */}
                    {loginView ? <LoginComp /> : <SignupComp />}

                    {/** Right side image component */}
                    <SideImage />
                    {/** Right side image component */}
                    <CgClose onClick={toggleAuthModal} size={22} className='stroke-1 block lg:hidden text-stone-900 opacity-80 hover:opacity-100 duration-100 cursor-pointer absolute right-4 top-4' />
                </div>
            </div>
        </motion.div>
    )
}
