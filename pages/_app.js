import '@/styles/globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }) {
  return (
    <>
      <GoogleOAuthProvider clientId='26689435518-i9nue5c1dqo4i35citvu81ua1tcmgu4i.apps.googleusercontent.com'>
        <AuthProvider>
          <Toaster />
          <Component {...pageProps} />
        </AuthProvider>
      </GoogleOAuthProvider>
    </>
  )
}
