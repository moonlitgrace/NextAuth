import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { useGoogleLogin } from '@react-oauth/google'
import { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import { BeatLoader } from 'react-spinners'

export const AuthMethods = () => {


    const {
        googleAuthStarted,
        setGoogleAuthStarted,
        setGithubAuthStarted,
        githubAuthStarted,
        googleLogin,
    } = useContext(AuthContext)

    const googleLoginBtn = useGoogleLogin({
        // initialize when google response is OK
        onSuccess: response => {
            googleLogin(response.access_token)
        },
        // when any google server error occurs
        onError: (err) => {
            setGoogleAuthStarted(false)
        },
        // when popup window is closed
        onNonOAuthError: (err) => {
            setGoogleAuthStarted(false)
        },
    })

    return (
        <div className="methods_container flex items-center justify-between gap-3">

            {/** google login btn */}
            <div onClick={() => {
                setGoogleAuthStarted(true)
                googleLoginBtn()
            }} className="google flex items-center justify-center border border-b-2 h-[2.9rem] px-5 rounded-lg w-1/2 cursor-pointer hover:bg-stone-100 duration-100">
                {/** show loader when auth started */}
                {
                    !googleAuthStarted ?
                        <h3 className='text-stone-800 font-medium flex items-center gap-2 text-sm'>
                            <FcGoogle className='w-4 h-4' />
                            Google
                        </h3>
                        :
                        <BeatLoader
                            color='#065AD8'
                            size={10}
                        />
                }
            </div>

            {/** github login btn */}
            <a style={{ color: 'inherit', textDecoration: 'none' }} onClick={() => setGithubAuthStarted(true)} href={`https://github.com/login/oauth/authorize?scope=user:email&client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_URL}`} className="github flex items-center justify-center border border-b-2 h-[2.9rem] px-5 rounded-lg w-1/2 cursor-pointer hover:bg-stone-100 duration-100">
                {
                    !githubAuthStarted ?
                        <h3 className='text-stone-800 font-medium flex items-center gap-2 text-sm'>
                            <FaGithub className=' w-4 h-4' />
                            Github
                        </h3>
                        :
                        <BeatLoader
                            color='#065AD8'
                            size={10}
                        />
                }
            </a>

        </div>
    )
}
