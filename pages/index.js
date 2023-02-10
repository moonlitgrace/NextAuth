import React, { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import { AuthContext } from '@/contexts/AuthContext'
import { AnimatePresence } from 'framer-motion'
import Link from 'next/link'

// import icons
import { BsStars } from 'react-icons/bs'
import { IoMdSend } from 'react-icons/io'

// import components
import { ChangePassword } from '@/components/common/ChangePassword'
import { AuthModal } from '@/components/common/AuthModal'
import { BeatLoader } from 'react-spinners'
import Image from 'next/image'
import HomeSvg from '@/public/home_page.svg'
import ViteSvg from '@/public/vite.svg'
import { Loading } from '@/components/common/Loading'

const Index = () => {

  const {
    loading,
    logoutUser,
    user,
    toggleChangePasswordView,
    changePasswordView,
    toggleAuthModal,
    showAuthModal,
    isAuthenticated,
    githubLogin,
    reviewSending,
    feedbackSubmit,
  } = useContext(AuthContext)

  const [review, setReview] = useState('')

  // works on feedback submit
  const handleReviewSubmit = (e) => {
    e.preventDefault()
    feedbackSubmit(review)
  }

  useEffect(() => {
    const url = window.location.href
    const hasCode = url.includes("?code=")
    if (hasCode) {
      const code = url.split("?code=")[1]
      console.log(code)
      githubLogin(code)
    }
  })

  return (
    <>
      <Head>
        <title>NextAuth - secure and powerful auth system</title>
        <link rel="shortcut icon" href="/vite.svg" />
        <meta charset="UTF-8"></meta>
        <meta name="description" content="Secure and Powerful Authentication system"></meta>
        <meta name="keywords" content="auth, authentication, django authentication, jwt authentication, jwt tokens"></meta>
        <meta name="author" content="Suneeth"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </Head>
      <div className="home_container flex flex-col items-center relative h-screen w-screen z-40">
        <div className="navabr bg-[#333333] p-5 flex justify-between items-center text-white w-full">
          <div className="logo flex items-center gap-10">
            <h2 className='text-[1.3rem] font-bold'>NextAuth</h2>
            <Link
              href='/'
              className='md:block hidden opacity-75 hover:opacity-100 duration-100'
            >Github</Link>
          </div>
          <div className="welcome_text md:block hidden">
            {
              isAuthenticated ? <span>Hello {user.first_name ?? user.email} ! Welcome to NextAuth</span> : <span>Hello, you&apos;re not loggedin !</span>
            }
          </div>
          {
            isAuthenticated ?
              <div className="nav_links flex items-center gap-3">
                <button
                  onClick={toggleChangePasswordView}
                  className='opacity-75 hover:opacity-100 duration-100'
                >Change password</button>
                <button
                  onClick={logoutUser}
                  className='opacity-75 hover:opacity-100 duration-100'
                >Logout</button>
              </div>
              :
              <button
                onClick={toggleAuthModal}
                className='opacity-75 hover:opacity-100 duration-100'
              >Log in / Sign up</button>
          }
        </div>
        <div className="home_box flex items-center justify-center md:gap-10 md:mt-20 mt-10 w-min md:w-full">
          <div className="home_left_sec text-[#333333]">
            <div className="welcome_text md:hidden block mb-3">
              {
                isAuthenticated ? <span>Hello {user.first_name ?? user.email} ! Welcome to</span> : <span>Hello, you&apos;re not loggedin !</span>
              }
            </div>
            <div className='flex items-center lg:gap-5 gap-3'>
              <Image src={ViteSvg} alt="nextAuth logo" className='lg:w-12 lg:h-12' />
              <h1 className='lg:text-5xl text-4xl font-extrabold'>
                <span className='text-[#6C63FF]'>Next</span>
                Auth
              </h1>
            </div>
            <div className='mt-5'>
              <h3 className='lg:text-lg'>NextAuth is a powerful and secure Authentication system <br />
                made with Django and React js.</h3>
              <h3 className='lg:mt-4 mt-2'>A perfect Auth system for your project.</h3>
            </div>

            <hr className='my-6' />

            <div className="review">
              <h3 className='text-md font-medium flex items-center gap-3 text-[#3F3D56]'>
                {user ? 'Give me a feedback' : 'Log in to give me a feedback'}
                <BsStars color='#075BDB' />
              </h3>
              <form className='mt-2 flex flex-col lg:w-[25rem] w-[20rem]' onSubmit={handleReviewSubmit}>
                <textarea
                  disabled={!user}
                  value={review}
                  onChange={e => setReview(e.target.value)}
                  cols="10"
                  rows="3"
                  placeholder='How is this Authentication system ?'
                  className='border focus:border-[#6C63FF]/75 outline-none rounded-md p-3 text-[#3F3D56]'
                ></textarea>
                <button
                  disabled={!review}
                  className='bg-[#6C63FF] hover:bg-[#065AD8] disabled:bg-[#6C63FF]/50 disabled:hover:bg-[#6C63FF]/50 duration-100 text-white p-2 rounded-md text-md font-semibold mt-3'
                >
                  {
                    !reviewSending ? (
                      <div className='flex items-center justify-center gap-2'>
                        <span>Send</span>
                        <IoMdSend />
                      </div>
                    )
                      :
                      <BeatLoader
                        color='#E6E6E6'
                        size={8}
                      />
                  }
                </button>
              </form>
            </div>
          </div>
          <div className="home_image_sec md:block hidden">
            <Image className='lg:w-[30rem] w-[20rem]' src={HomeSvg} alt="Home page svg" />
          </div>
        </div>
        <AnimatePresence>
          {changePasswordView && <ChangePassword toggleChangePasswordView={toggleChangePasswordView} />}
          {showAuthModal && <AuthModal />}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {loading && <Loading />}
      </AnimatePresence>
    </>
  )
}

export default Index