import React from 'react'
import { useAuth } from '../context/auth'

export default function VerifyEmail() {
    const [auth, setAuth] = useAuth();
  return (
    <div>Please check your email <a className='text-white hover:underline' href='https://mail.google.com/'>{auth.user.newUser.email}</a> to verify your account</div>
  )
}
