import { LegacyRef, useEffect, useRef, useState } from 'react'
import EmojiPicker, { Theme } from 'emoji-picker-react';
import { DocumentData, arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../libs/firebase';
import { useChatStore } from '../hooks/useChat';
import { useAuthStore } from '../hooks/useAuth';
import uploadFile from '../libs/upload';

interface IImage {
    file: File | null;
    imgUrl: string
}

const Chat = () => {
    const bottomRef = useRef<HTMLDivElement>(null)
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false)
    const [chat, setChat] = useState<DocumentData | undefined>()
    const [message, setMessage] = useState("")
    const [image, setImage] = useState<IImage>({
        file: null,
        imgUrl: ""
    })
    const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore()
    const { currentUser } = useAuthStore()


    const handleEmojiClick = (emoji: string) => {
        setMessage(prev => prev + emoji)
    }

    useEffect(() => {
        bottomRef?.current?.scrollIntoView({ behavior: "smooth" })
    }, [])

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", chatId!), (res) => {
            setChat(res.data())
        })

        return () => {
            unSub()
        }
    }, [chatId])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage({
                file: e.target.files[0],
                imgUrl: URL.createObjectURL(e.target.files[0])
            })
        }
    }


    const handleSendMessage = async () => {
        if (message === "") return;

        let imgUrl = null

        if (image.file) {
            imgUrl = await uploadFile(image.file)
        }

        try {
            await updateDoc(doc(db, "chats", chatId!), {
                messages: arrayUnion({
                    senderId: currentUser?.id,
                    text: message,
                    createdAt: new Date(),
                    ...(imgUrl && { img: imgUrl })!
                })
            })

            const userIds = [currentUser?.id, user.id]

            userIds.forEach(async (id) => {
                const userChatRef = doc(db, "userchats", id!)
                const userChatsSnapshot = await getDoc(userChatRef)

                if (userChatsSnapshot.exists()) {
                    const userChatsData = userChatsSnapshot.data()

                    const chatIndex = userChatsData.chats.findIndex((c: any) => c.chatId === chatId)

                    userChatsData.chats[chatIndex].lastMessage = message
                    userChatsData.chats[chatIndex].isSeen = id === currentUser?.id ? true : false
                    userChatsData.chats[chatIndex].updatedAt = Date.now()

                    await updateDoc(userChatRef, {
                        chats: userChatsData.chats
                    })
                }
            })
        } catch (error) {
            console.log("err", error)
        }

        setMessage("")
        setImage({
            file: null,
            imgUrl: ""
        })
    }


    return (
        <div className='mx-3 border-x border-x-solid border-white/60 h-full flex flex-col'>
            <div className='px-2 pb-2 flex items-center justify-between border-b border-b-solid border-b-white/60'>
                <div className='flex items-center gap-2'>
                    <img className='w-12 h-12 rounded-full' src={user?.avatar || './avatar.png'} alt='' />
                    <div>
                        <h3 className='font-medium'>{user?.username}</h3>
                        <p className='font-light text-[13px] text-gray-400'>Lorem ipsum dolor sit</p>
                    </div>
                </div>
                <div className='flex items-center gap-4'>
                    <img className='w-5 cursor-pointer' src='./phone.png' alt='' />
                    <img className='w-5 cursor-pointer' src='./video.png' alt='' />
                    <img className='w-5 cursor-pointer' src='./info.png' alt='' />
                </div>
            </div>
            <div className='flex-1 overflow-y-auto custom-scrollbar p-2 flex flex-col gap-2'>

                {chat?.messages.map((message: any) => (

                    <div key={message.createdAt} className={`max-w-[70%] w-fit p-3 rounded-xl ${message.senderId === currentUser?.id ? "flex-row-reverse bg-black/50 self-end" : "bg-purple-600"} flex gap-2`}>

                        <img className='w-[45px] h-[45px] rounded-full' src='./avatar.png' alt='' />

                        <div>
                            {message.img && <img src={message.img} alt='' className='w-[400px] h-[220px]' />}
                            <p>{message.text}</p>
                            {/* <span className='font-light text-xs'>{message.createdAt}</span> */}

                        </div>
                    </div>
                ))}

                {image.imgUrl && <img src={image.imgUrl} alt='' className='w-[400px] h-[220px]' />}


                {/* <div className='w-[70%] p-3 rounded-xl bg-black/50 flex flex-row-reverse gap-2 self-end'>
                    <div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, adipisci.</p>
                        <span className='font-light text-xs'>2 mins ago</span>

                    </div>
                </div> */}


                <div ref={bottomRef} />

            </div>
            <div className='flex items-center px-2 gap-4'>
                <label htmlFor='image'>
                    <img className='w-8 h-8 cursor-pointer' src='./img.png' alt='' />
                </label>
                <input onChange={handleImageChange} type='file' id='image' className='hidden' />
                <div className='flex-1 flex items-center gap-4'>
                    <input disabled={(isCurrentUserBlocked || isReceiverBlocked)} className='w-full bg-black/40 outline-none p-5 rounded-md' value={message} onChange={(e) => setMessage(e.target.value)} type='text' placeholder='Type a message...' />
                    <div className='relative'>
                        <img onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)} className='w-8 h-6 cursor-pointer' src='./emoji.png' alt='' />
                        <div className={`absolute bottom-8 left-0`}>
                            <EmojiPicker open={isEmojiPickerOpen} onEmojiClick={(emo) => handleEmojiClick(emo.emoji)} theme={Theme.DARK} />
                        </div>
                    </div>
                    <button disabled={(isCurrentUserBlocked || isReceiverBlocked)} onClick={handleSendMessage} className='bg-blue-600/60 hover:bg-blue-600 transition-colors duration-300 px-4 py-2 rounded-md'>Send</button>
                </div>
            </div>
        </div>
    )
}

export default Chat