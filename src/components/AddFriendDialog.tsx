import { DocumentData, DocumentReference, arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { db } from '../libs/firebase';
import { useAuthStore } from '../hooks/useAuth';

interface IAddFriendsDialog {
    closeDialog: () => void;
}

const AddFriendDialog: React.FC<IAddFriendsDialog> = ({ closeDialog }) => {
    const [users, setUsers] = useState<DocumentData | undefined>(undefined)
    const dialogRef = useRef<HTMLDivElement>(null)

    const { currentUser } = useAuthStore()

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
                closeDialog();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closeDialog]);

    const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const username = formData.get("username") as string

        try {
            const userRef = collection(db, "users");

            const q = query(userRef, where("username", "==", username));

            const querySnapShot = await getDocs(q)

            if (!querySnapShot.empty) {
                setUsers(querySnapShot.docs[0].data())
            }

        } catch (error) {
            console.log("err", error)
        }
    }

    const handleAddFriend = async () => {
        const chatRef = collection(db, "chats") as any
        const userChatsRef = collection(db, "userchats")

        try {

            const newChatRef = doc(chatRef)

            await setDoc(newChatRef, {
                createdAt: serverTimestamp(),
                messages: []
            })

            await updateDoc(doc(userChatsRef, users?.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: currentUser?.id,
                    updatedAt: Date.now()
                })
            })

            await updateDoc(doc(userChatsRef, currentUser?.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: users?.id,
                    updatedAt: Date.now()
                })
            })

            console.log(newChatRef.id)

        } catch (error) {

        }
    }

    return (
        <div className='absolute inset-0 m-auto flex items-center justify-center flex-col gap-4'>
            <div ref={dialogRef} className='bg-black/80 p-8 rounded-lg'>

                <form onSubmit={handleSearchSubmit} className='flex items-center gap-2 mb-4 pb-4 border-b border-b-solid border-b-blue-600'>
                    <input className='p-2 outline-none rounded-md text-black' placeholder='Username' name='username' />
                    <button className='bg-blue-600/60 hover:bg-blue-600 transition-colors duration-300 p-2 rounded-md'>Search</button>
                </form>
                <div>
                    {users && (
                        <div className='flex items-center justify-between mb-4'>
                            <div className='flex items-center gap-2'>
                                <img className='w-[40px] h-[40px] rounded-full object-cover' src={users.avatar || './avatar.png'} alt='' />
                                <p>{users.username}</p>
                            </div>
                            <button onClick={handleAddFriend} className='bg-white text-black p-2 rounded-md font-medium'>Add Friend</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AddFriendDialog