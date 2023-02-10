import React from 'react'
import { CgClose } from 'react-icons/cg'
import { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import Image from 'next/image'
import AuthSvg from '@/public/login_image.svg'

export const SideImage = () => {

    const { toggleAuthModal } = useContext(AuthContext)

    return (
        <div className="images w-1/2 h-[33rem] hidden bg-[#065AD8] items-center justify-center lg:flex flex-col relative">
            <CgClose onClick={toggleAuthModal} size={22} className='stroke-1 text-white opacity-80 hover:opacity-100 duration-100 cursor-pointer absolute right-4 top-4' />
            <Image src={AuthSvg} className='w-[12rem]' alt="Login image svg" />
            <h3 className='text-white font-bold text-md text-center mt-5'>NextAuth provides powerful Authentication system</h3>
            <p className='text-white/80 text-sm'>Best auth system what you&apos;re looking for !</p>
            <a href="#" className='text-white/75 text-sm underline mt-3'>Source code</a>
        </div>
    )
}
