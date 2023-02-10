import React, { useContext, useState } from 'react'
import { AiFillEye, AiFillEyeInvisible, AiOutlineUser } from 'react-icons/ai'
import { HiOutlineMail } from 'react-icons/hi'
import { RiLockPasswordLine } from 'react-icons/ri'
import { AuthMethods } from '../common/AuthMethods'
import { BeatLoader } from 'react-spinners'
import { AuthContext } from '@/contexts/AuthContext'
import Image from 'next/image'
import ViteSvg from '@/public/vite.svg'

export const SignupComp = () => {

    const {
        registerUser,
        isRegistering,
        toggleSignupLoginView,
    } = useContext(AuthContext)

    const [showPassword, setShowPassword] = useState(false)
    // form states
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // handle show and hide password
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    // initialze on signup btn clicked
    const handleSignupSubmit = (e) => {
        e.preventDefault()
        registerUser(name, email, password)
    }

    return (
        <div className="login_form lg:w-1/2 flex items-center justify-center flex-col">
            <div className='lg:w-3/4'>
                <div className="header w-full">
                    <div className="logo flex items-center gap-2">
                        <Image className='w-5' src={ViteSvg} alt="" />
                        <h1 className='font-semibold text-[#075BDB]'>NextAuth</h1>
                    </div>
                    <div className="intro mt-4">
                        <h2 className='text-[1.6rem] font-bold text-stone-800'>Create an account</h2>
                        <h4 className='text-sm text-stone-800/75 mt-1'>Select method to sign up:</h4>
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
                    <form className='flex flex-col gap-2' onSubmit={handleSignupSubmit}>

                        {/** Input fields */}
                        <div className="name_input relative flex items-center text-stone-800/75 focus-within:text-stone-800">
                            <span className='absolute pl-3 opacity-50 pointer-events-none'><AiOutlineUser size={20} /></span>
                            <input value={name} onChange={e => setName(e.target.value)} type="text" name='name' placeholder='Name' className='border focus:border-[#065AD8]/75 duration-100 outline-none p-[0.4rem] pl-10 rounded-md bg-stone-50/50 w-full' />
                        </div>
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

                        {/** submit button */}
                        <button disabled={!name || !email || !password || isRegistering} className='bg-[#065AD8] hover:bg-[#0551c1] duration-100 text-white p-[0.5rem] rounded-md font-semibold text-md'>
                            {
                                !isRegistering ? (
                                    <div className='flex items-center justify-center gap-2'>
                                        <span>Sign up</span>
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
                            Already have an account ?
                            <button onClick={toggleSignupLoginView}>
                                <span className='text-[#065AD8] font-medium hover:text-[#0551c1]'>
                                    Login now</span>
                            </button>
                        </span>
                    </center>
                </div>
            </div>
        </div>
    )
}
