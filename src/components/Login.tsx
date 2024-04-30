import React from 'react'

const Login = () => {
    return (
        <div className='w-full h-full flex flex-col gap-4 items-center justify-center'>
            <h2 className='text-2xl font-semibold'>Welcome</h2>
            <form className='flex flex-col gap-4'>
                <input className='p-3 outline-none bg-black/40 rounded-md' type='text' placeholder='Email' name='email' />
                <input className='p-3 outline-none bg-black/40 rounded-md' type='text' placeholder='Password' name='password' />
                <button className='bg-blue-600/80 py-2 rounded-md hover:bg-blue-600'>Sign In</button>
            </form>
        </div>
    )
}

export default Login