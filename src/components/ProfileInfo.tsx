import React from 'react'
import { useAuthStore } from '../hooks/useAuth'

const ProfileInfo = () => {
    const { currentUser } = useAuthStore()
    return (
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-5'>
                <img className='w-[50px] h-[50px] rounded-full object-cover' src={currentUser?.avatar || './avatar.png'} alt='' />
                <h2>{currentUser?.username}</h2>
            </div>
            <div className='flex gap-5'>
                <img className='w-5 cursor-pointer' src='./more.png' alt='' />
                <img className='w-5 cursor-pointer' src='./video.png' alt='' />
                <img className='w-5 cursor-pointer' src='./edit.png' alt='' />
            </div>
        </div>
    )
}

export default ProfileInfo