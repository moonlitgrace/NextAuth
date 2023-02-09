import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'
import { CgClose } from 'react-icons/cg'
import { motion } from 'framer-motion'
import { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import { BeatLoader } from 'react-spinners'

export const ChangePassword = () => {

    const {
        toggleChangePasswordView,
        isPassChanging,
        changePassword,
    } = useContext(AuthContext)

    const [showPassword, setShowPassword] = useState(false)
    const [newPassword1, setNewPassword1] = useState('')
    const [newPassword2, setNewPassword2] = useState('')

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        changePassword(newPassword1, newPassword2)
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.09 }}

            className="change_password_container absolute inset-0 bg-black/25 flex items-center justify-center">
            <div className="change_password_box bg-white drop-shadow-xl w-1/2 h-3/5 rounded-lg p-5 flex gap-5">
                {/** change password left section */}
                <div className="left_sec w-1/2 flex flex-col justify-between">
                    <div className="content text-[#333333]">
                        <h2 className='text-2xl font-semibold'>Change password</h2>
                        <p className='opacity-75'>Set a new password for your account</p>

                        <h3 className="mt-5">Keep in mind :</h3>
                        <ul className='text-sm list-disc ml-7 mt-1 opacity-90'>
                            <li>New password shouldn't be same as current password</li>
                            <li>Please enter current password correctly</li>
                        </ul>
                    </div>
                    <div className="form_wrapper mt-5">
                        <form className='flex flex-col gap-3' onSubmit={handleFormSubmit}>
                            <div className="password_input relative flex items-center text-stone-800/75 focus-within:text-stone-800">
                                <span className='absolute pl-3 opacity-50 pointer-events-none'><RiLockPasswordLine size={20} /></span>
                                <input value={newPassword1} onChange={e => setNewPassword1(e.target.value)} type={showPassword ? 'text' : 'password'} name='password' placeholder='New Password' className='border focus:border-[#065AD8]/75 duration-100 outline-none p-[0.4rem] pl-10 rounded-md bg-stone-50/50 w-full' />
                                <span className='absolute right-0 pr-3 opacity-50 cursor-pointer' onClick={handleShowPassword}>
                                    {
                                        showPassword ? <AiFillEye size={22} /> : <AiFillEyeInvisible size={22} />
                                    }
                                </span>
                            </div>
                            <div className="password_input relative flex items-center text-stone-800/75 focus-within:text-stone-800">
                                <span className='absolute pl-3 opacity-50 pointer-events-none'><RiLockPasswordLine size={20} /></span>
                                <input value={newPassword2} onChange={e => setNewPassword2(e.target.value)} type={showPassword ? 'text' : 'password'} name='password' placeholder='Confirm Password' className='border focus:border-[#065AD8]/75 duration-100 outline-none p-[0.4rem] pl-10 rounded-md bg-stone-50/50 w-full' />
                                <span className='absolute right-0 pr-3 opacity-50 cursor-pointer' onClick={handleShowPassword}>
                                    {
                                        showPassword ? <AiFillEye size={22} /> : <AiFillEyeInvisible size={22} />
                                    }
                                </span>
                            </div>
                            {/** submit button */}
                            <button disabled={!newPassword1 || !newPassword2} className='bg-[#065AD8] hover:bg-[#0551c1] duration-100 text-white p-[0.5rem] rounded-md font-semibold text-md'>
                                {
                                    !isPassChanging ? (
                                        <div className='flex items-center justify-center gap-2'>
                                            <span>Submit</span>
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
                    </div>
                </div>

                {/** illustration section */}
                <div className="illu_container w-1/2 flex flex-col items-end justify-between">
                    <CgClose onClick={toggleChangePasswordView} size={22} className='stroke-1 opacity-50 hover:opacity-75 duration-100 cursor-pointer' />
                    <img src='/change_password.svg' className='w-auto h-auto' alt="Illustration" />
                </div>
            </div>
        </motion.div>
    )
}