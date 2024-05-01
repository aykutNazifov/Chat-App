import React from 'react'
import { useChatStore } from '../hooks/useChat'
import { useAuthStore } from '../hooks/useAuth'
import { db } from '../libs/firebase'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'

const Details = () => {
    const { user, isReceiverBlocked, changeBlock, isCurrentUserBlocked } = useChatStore()
    const { currentUser } = useAuthStore()

    const handleBlock = async () => {
        if (!user) return;

        const userDocRef = doc(db, "users", currentUser?.id!)
        try {
            await updateDoc(userDocRef, {
                blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id)
            })
            changeBlock()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <div className='flex items-center flex-col gap-4 pb-2 mb-2 border-b order-b-solid border-b-white/60'>
                <img className='w-[100px] h-[100px] rounded-full object-cover' src={user?.avatar || './avatar.png'} alt='' />
                <h2 className='font-medium'>{user?.username}</h2>
                <p className='text-[12px]'>Lorem ipsum dolor sit amet.</p>
            </div>
            <div>
                <button onClick={handleBlock} className='px-5 py-2 bg-red-600/80 hover:bg-red-600 transition-colors duration-300 w-full rounded-md font-medium'>{(isCurrentUserBlocked || isReceiverBlocked) ? "Blocked" : "Block User"}</button>
            </div>
        </div>
    )
}

export default Details