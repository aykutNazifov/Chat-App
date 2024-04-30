import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { auth } from '../libs/firebase'

const Login = () => {
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const email = formData.get("email") as string
        const password = formData.get("password") as string

        try {
            setIsLoading(true)

            await signInWithEmailAndPassword(auth, email, password)

        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }


    }
    return (
        <div className='w-full h-full flex flex-col gap-4 items-center justify-center'>
            <h2 className='text-2xl font-semibold'>Welcome</h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input className='p-3 outline-none bg-black/40 rounded-md' type='text' placeholder='Email' name='email' />
                <input className='p-3 outline-none bg-black/40 rounded-md' type='password' placeholder='Password' name='password' />
                <button disabled={isLoading} className='bg-blue-600/80 py-2 rounded-md disabled:bg-blue-600/20 disabled:cursor-not-allowed hover:bg-blue-600'>Sign In</button>
            </form>
        </div>
    )
}

export default Login