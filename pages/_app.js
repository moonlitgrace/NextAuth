import '@/styles/globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }) {
  return (
    <>
      <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}>
        <AuthProvider>
          <Toaster />
          <Component {...pageProps} />
        </AuthProvider>
      </GoogleOAuthProvider>
    </>
  )
}
