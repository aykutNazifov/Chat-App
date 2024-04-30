import React, { useState } from 'react'
import { toast } from 'react-toastify';

interface IAvatar {
    file: File | null;
    imgUrl: string
}

const Register = () => {
    const [avatar, setAvatar] = useState<IAvatar>({
        file: null,
        imgUrl: ""
    })

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAvatar({
                file: e.target.files[0],
                imgUrl: URL.createObjectURL(e.target.files[0])
            })
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        toast.success("Test!")
    }
    return (
        <div className='h-full flex flex-col items-center justify-center gap-3'>
            <h2 className='text-2xl font-semibold'>Create An Account</h2>
            <form onSubmit={handleSubmit} className='flex flex-col items-center gap-3'>
                <img className='w-[100px] h-[100px] rounded-full' src={avatar.imgUrl || "./avatar.png"} />
                <label htmlFor="file">Upload an image</label>
                <input className='hidden' type='file' id='file' onChange={handleAvatarChange} />
                <input className='p-3 outline-none bg-black/40 rounded-md' type='text' placeholder='Username' name='username' />
                <input className='p-3 outline-none bg-black/40 rounded-md' type='text' placeholder='Email' name='email' />
                <input className='p-3 outline-none bg-black/40 rounded-md' type='text' placeholder='Password' name='password' />
                <button className='bg-blue-600/80 py-2 rounded-md hover:bg-blue-600 w-full'>Sign Up</button>
            </form>
        </div>
    )
}

export default Register