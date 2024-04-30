import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { auth, db } from '../libs/firebase';
import { doc, setDoc } from 'firebase/firestore';
import uploadFile from '../libs/upload';

interface IAvatar {
    file: File | null;
    imgUrl: string
}

const Register = () => {
    const [avatar, setAvatar] = useState<IAvatar>({
        file: null,
        imgUrl: ""
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAvatar({
                file: e.target.files[0],
                imgUrl: URL.createObjectURL(e.target.files[0])
            })
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const username = formData.get("username") as string
        const email = formData.get("email") as string
        const password = formData.get("password") as string

        try {

            setIsLoading(true)

            const res = await createUserWithEmailAndPassword(auth, email, password)
            let avatarUrl

            if (avatar.file) {
                avatarUrl = await uploadFile(avatar.file)
            }

            await setDoc(doc(db, "users", res.user.uid), {
                username,
                email,
                avatar: avatarUrl,
                id: res.user.uid,
                blocked: []
            });

            await setDoc(doc(db, "userchats", res.user.uid), {
                chats: []
            });

            toast.success("New account created successfully! You can login now!")

        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className='h-full flex flex-col items-center justify-center gap-3'>
            <h2 className='text-2xl font-semibold'>Create An Account</h2>
            <form onSubmit={handleSubmit} className='flex flex-col items-center gap-3'>
                <img className='w-[100px] h-[100px] rounded-full' src={avatar.imgUrl || "./avatar.png"} />
                <label className='cursor-pointer' htmlFor="file">Upload an image</label>
                <input className='hidden' type='file' id='file' onChange={handleAvatarChange} />
                <input className='p-3 outline-none bg-black/40 rounded-md' type='text' placeholder='Username' name='username' />
                <input className='p-3 outline-none bg-black/40 rounded-md' type='text' placeholder='Email' name='email' />
                <input className='p-3 outline-none bg-black/40 rounded-md' type='password' placeholder='Password' name='password' />
                <button disabled={isLoading} className='bg-blue-600/80 py-2 rounded-md disabled:bg-blue-600/20 disabled:cursor-not-allowed hover:bg-blue-600 w-full'>Sign Up</button>
            </form>
        </div>
    )
}

export default Register