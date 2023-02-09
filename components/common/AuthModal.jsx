import React, { useContext, useEffect } from 'react'
import Head from 'next/head'
import { AuthContext } from '@/contexts/AuthContext'
import { motion } from 'framer-motion'
import { SideImage } from './SideImage'
import { LoginComp } from '../LoginComp'
import { SignupComp } from '../SignupComp'


export const AuthModal = () => {
    const {
        loginView,
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
            <div className="signup_container flex items-center justify-center bg-black/25 w-screen h-screen absolute inset-0">
                <div className="signup_box flex w-[56rem] h-[33rem] bg-white rounded-lg overflow-hidden drop-shadow-xl">

                    {/** showing login form or signup form */}
                    {loginView ? <LoginComp /> : <SignupComp />}

                    {/** Right side image component */}
                    <SideImage />
                    {/** Right side image component */}
                </div>
            </div>
        </motion.div>
    )
}
