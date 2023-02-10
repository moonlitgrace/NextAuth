import React from 'react'
import Link from 'next/link'
import { AuthMethods } from '../common/AuthMethods'
import { HiOutlineMail } from 'react-icons/hi'
import { RiLockPasswordLine } from 'react-icons/ri'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { useState } from 'react'
import { BeatLoader } from 'react-spinners'
import { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import Image from 'next/image'
import ViteSvg from '@/public/vite.svg'

export const LoginComp = () => {

    const {
        loginUser,
        isLoging,
        loginUserEmail,
        toggleSignupLoginView,
    } = useContext(AuthContext)

    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState(loginUserEmail ? loginUserEmail : '')
    const [password, setPassword] = useState('')

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleLoginSubmit = (e) => {
        e.preventDefault()
        loginUser(email, password)
    }

    return (
        <div className="login_form lg:w-1/2 flex items-center justify-center flex-col">
            <div className='lg:w-3/4'>
                <div className="header w-full">
                    <Link href={'/'} className="logo flex items-center gap-2">
                        <Image className='w-5' src={ViteSvg} alt="" />
                        <h1 className='font-semibold text-[#075BDB]'>NextAuth</h1>
                    </Link>
                    <div className="intro mt-4">
                        <h2 className='text-[1.6rem] font-bold text-stone-800'>Log in to your Account</h2>
                        <h4 className='text-sm text-stone-800/75 mt-1'>Welcome back ! Select method to log in:</h4>
                    </div>
                    <div className="methods mt-5">
                        <AuthMethods />
                    </div>
                </div>

                {/** Divider */}
                <div className="relative flex py-5 items-center">
                    <div className="flex-grow border-t border-stone-800/20"></div>
                    <span className="flex-shrink mx-4 text-stone-800/50">Or continue with email</span>
                    <div className="flex-grow border-t border-stone-800/20"></div>
                </div>
                {/** Divider */}

                <div className="form_wrapper">
                    <form className='flex flex-col gap-3' onSubmit={handleLoginSubmit}>

                        {/** Input fields */}
                        <div className="email_input relative flex items-center text-stone-800/75 focus-within:text-stone-800">
                            <span className='absolute pl-3 opacity-50 pointer-events-none'><HiOutlineMail size={20} /></span>
                            <input value={email} onChange={e => setEmail(e.target.value)} type="email" name='email' placeholder='Email' className='border focus:border-[#065AD8]/75 duration-100 outline-none p-[0.4rem] pl-10 rounded-md bg-stone-50/50 w-full' />
                        </div>
                        <div className="password_input relative flex items-center text-stone-800/75 focus-within:text-stone-800">
                            <span className='absolute pl-3 opacity-50 pointer-events-none'><RiLockPasswordLine size={20} /></span>
                            <input value={password} onChange={e => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} name='password' placeholder='Password' className='border focus:border-[#065AD8]/75 duration-100 outline-none p-[0.4rem] pl-10 rounded-md bg-stone-50/50 w-full' />
                            <span className='absolute right-0 pr-3 opacity-50 cursor-pointer' onClick={handleShowPassword}>
                                {
                                    showPassword ? <AiFillEye size={22} /> : <AiFillEyeInvisible size={22} />
                                }
                            </span>
                        </div>
                        {/** Input fields */}

                        <div className="options flex items-center justify-between">
                            <label className='text-sm flex items-center gap-2 text-stone-800 text-stone-800/75 cursor-pointer'>
                                <input type="checkbox" defaultChecked />
                                Remember me
                            </label>
                        </div>

                        {/** submit button */}
                        <button disabled={!email || !password || isLoging} className='bg-[#065AD8] hover:bg-[#0551c1] duration-100 text-white p-[0.5rem] rounded-md font-semibold text-md'>
                            {
                                !isLoging ? (
                                    <div className='flex items-center justify-center gap-2'>
                                        <span>Log in</span>
                                    </div>
                                )
                                    :
                                    <BeatLoader
                                        color='#E6E6E6'
                                        size={8}
                                    />
                            }
                        </button>
                        {/** submit button */}
                    </form>

                    <center className='mt-3'>
                        <span className='text-sm text-stone-800/75 flex gap-2 items-center justify-center'>
                            Don&apos;t have an account ?
                            <button onClick={toggleSignupLoginView}>
                                <span className='text-[#065AD8] font-medium hover:text-[#0551c1]'>
                                    Create an account</span>
                            </button>
                        </span>
                    </center>
                </div>
            </div>
        </div>
    )
}