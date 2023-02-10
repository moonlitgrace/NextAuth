import { createContext } from 'react'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { Loading } from '@/components/common/Loading'
import { API_URL } from '@/config'
import { useRouter } from 'next/router'

const errorToast = (errortext) => toast.error(errortext, {
    duration: 4000,
})
const successToast = (successText) => toast.success(successText, {
    duration: 4000,
})

export const AuthContext = createContext()


export const AuthProvider = ({ children }) => {

    const router = useRouter()

    const [user, setUser] = useState({})
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)
    const [isLoging, setIsLoging] = useState(false)
    const [isPassChanging, setIsPassChanging] = useState(false)
    const [isRegistering, setIsRegistering] = useState(false)
    const [reviewSending, setReviewSending] = useState(false)


    const [googleAuthStarted, setGoogleAuthStarted] = useState(false)
    const [githubAuthStarted, setGithubAuthStarted] = useState(false)
    // const [loginUserEmail, setLoginUserEmail] = useState('')

    // components view
    const [changePasswordView, setChangePasswordView] = useState(false)
    const [loginView, setLoginView] = useState(true)
    // auth modal
    const [showAuthModal, setShowAuthModal] = useState(false)

    // toggle auth modal
    const toggleAuthModal = () => {
        setShowAuthModal(!showAuthModal)
    }

    // toggle change password view
    const toggleChangePasswordView = () => {
        setChangePasswordView(!changePasswordView)
    }

    // toggle signup and login view
    const toggleSignupLoginView = () => {
        setLoginView(!loginView)
    }

    // update tokens
    const updateToken = async () => {
        const response = await fetch(`${API_URL}auth/token/refresh/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Access-Control-Allow-Credentials': 'true',
                'Content-Type': 'application/json',
            },
        })
    }

    // get user
    const getUser = async () => {
        const response = await fetch(`${API_URL}auth/user/`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Access-Control-Allow-Credentials': 'true',
                'Content-Type': 'application/json',
            },
        })
        if (response.ok) {
            const user = await response.json()
            setUser(user)
            setIsAuthenticated(true)
        } else {
            setShowAuthModal(true)
        }
        if (loading) setLoading(false)
    }

    // login
    const loginUser = async (email, password) => {
        setIsLoging(true)
        const response = await fetch(`${API_URL}auth/login/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Access-Control-Allow-Credentials': 'true',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        if (response.ok) {
            const data = await response.json()
            setIsLoging(false)
            setUser(data.user)
            setIsAuthenticated(true)
            successToast('You have been successfully logged in')
            setShowAuthModal(false)
        } else {
            setIsLoging(false)
            errorToast('Invalid credentials provided')
        }
    }

    // register
    const registerUser = async (first_name, email, password) => {
        setIsRegistering(true)
        const response = await fetch(`${API_URL}auth/registration/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Access-Control-Allow-Credentials': 'true',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name: first_name,
                email: email,
                password1: password,
                password2: password
            })
        })
        const data = await response.json()
        if (response.ok) {
            setIsRegistering(false)
            successToast('Registration success, please log in')
            setShowAuthModal(true)
            setLoginView(true)
        } else {
            setIsRegistering(false)
            errorToast(data.email || data.password1 || data.password2 || data.non_field_errors)
        }
    }

    // logout
    const logoutUser = async () => {
        const response = await fetch(`${API_URL}auth/logout/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Access-Control-Allow-Credentials': 'true',
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            const data = await response.json()
            setUser({})
            setIsAuthenticated(false)
            successToast('Logout success')
            setShowAuthModal(true)
            if (typeof window !== "undefined") {
                window.history.replaceState(null, '', '/')
            }
        } else {
            errorToast('Oops ! something went wrong')
            if (typeof window !== "undefined") {
                window.history.replaceState(null, '', '/')
            }
        }
    }

    // change password
    const changePassword = async (password1, password2) => {
        setIsPassChanging(true)
        const response = await fetch(`${API_URL}auth/password/change/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Access-Control-Allow-Credentials': 'true',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                new_password1: password1,
                new_password2: password2
            })
        })
        const data = await response.json()
        if (response.ok) {
            setIsPassChanging(false)
            successToast(data.detail)
            setChangePasswordView(false)
        } else {
            setIsPassChanging(false)
            errorToast(data.new_password1 || data.new_password2)
        }
    }

    // social logins

    // google login
    const googleLogin = async (access_token) => {
        const response = await fetch(`${API_URL}social-auth/google/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Access-Control-Allow-Credentials': 'true',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                access_token
            })
        })
        const data = await response.json()
        if (response.ok) {
            setGoogleAuthStarted(false)
            setIsAuthenticated(true)
            setUser(data.user)
            successToast('You have been successfully logged in')
            setShowAuthModal(false)
        } else {
            setGoogleAuthStarted(false)
            errorToast(data.non_field_errors)
        }
    }

    // github login
    const githubLogin = async (code) => {
        setGithubAuthStarted(true)
        const response = await fetch(`${API_URL}social-auth/github/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Access-Control-Allow-Credentials': 'true',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code
            })
        })
        const data = await response.json()
        if (response.ok) {
            setIsAuthenticated(true)
            setUser(data.user)
            successToast('You have been successfully logged in')
            setGithubAuthStarted(false)
            setShowAuthModal(false)
        } else {
            setGithubAuthStarted(false)
            if (typeof window !== "undefined") {
                window.history.replaceState(null, '', '/')
            }
            errorToast(data.non_field_errors)
        }
    }

    // feedback submit
    const feedbackSubmit = async (review) => {
        setReviewSending(true)
        const response = await fetch(`${API_URL}api/new-feedback/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Access-Control-Allow-Credentials': 'true',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                body: review
            })
        })
        if (response.ok) {
            setReviewSending(false)
            successToast('Thanks, your feedback submitted')
        } else {
            setReviewSending(false)
        }
    }

    useEffect(() => {
        if (loading) {
            getUser()
        }
        const intervalTime = 1000 * 60 * 25
        const interval = setInterval(() => {
            if (user) {
                updateToken()
            }
        }, [intervalTime])
        return () => clearInterval(interval)
    }, [loading])

    // data context 
    const contextData = {
        user: user,
        isAuthenticated: isAuthenticated,
        isLoging: isLoging,
        isPassChanging: isPassChanging,
        isRegistering: isRegistering,

        loginUser: loginUser,
        logoutUser: logoutUser,
        registerUser: registerUser,
        changePassword: changePassword,

        // social logins
        googleLogin: googleLogin,
        githubLogin: githubLogin,

        googleAuthStarted: googleAuthStarted,
        setGoogleAuthStarted: setGoogleAuthStarted,
        githubAuthStarted: githubAuthStarted,
        setGithubAuthStarted: setGithubAuthStarted,

        // change password component view
        toggleChangePasswordView: toggleChangePasswordView,
        changePasswordView: changePasswordView,
        // change password submit
        isPassChanging: isPassChanging,
        setIsPassChanging: setIsPassChanging,
        // feedback submit
        feedbackSubmit: feedbackSubmit,
        reviewSending: reviewSending,
        // login view
        loginView: loginView,
        // toggle between signup and login
        toggleSignupLoginView: toggleSignupLoginView,
        //auth modal
        toggleAuthModal: toggleAuthModal,
        showAuthModal: showAuthModal,
        setShowAuthModal: setShowAuthModal,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? <Loading /> : children}
        </AuthContext.Provider>
    )
}