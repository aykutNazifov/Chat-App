import { LegacyRef, useEffect, useRef, useState } from 'react'
import EmojiPicker, { Theme } from 'emoji-picker-react';

const Chat = () => {
    const bottomRef = useRef<HTMLDivElement>(null)
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false)
    const [message, setMessage] = useState("")

    const handleEmojiClick = (emoji: string) => {
        setMessage(prev => prev + emoji)
    }

    useEffect(() => {
        bottomRef?.current?.scrollIntoView({ behavior: "smooth" })
    }, [])

    return (
        <div className='mx-3 border-x border-x-solid border-white/60 h-full flex flex-col'>
            <div className='px-2 pb-2 flex items-center justify-between border-b border-b-solid border-b-white/60'>
                <div className='flex items-center gap-2'>
                    <img className='w-12 h-12 rounded-full' src='./avatar.png' alt='' />
                    <div>
                        <h3 className='font-medium'>Jane Doe</h3>
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
                <div className='w-[70%] p-3 rounded-xl bg-purple-600 flex gap-2'>
                    <img className='w-[45px] h-[45px] rounded-full' src='./avatar.png' alt='' />
                    <div>
                        <img src='./avatar.png' alt='' className='w-[400px] h-[220px]' />
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, adipisci.</p>
                        <span className='font-light text-xs'>2 mins ago</span>

                    </div>
                </div>
                <div className='w-[70%] p-3 rounded-xl bg-black/50 flex flex-row-reverse gap-2 self-end'>
                    <img className='w-[45px] h-[45px] rounded-full' src='./avatar.png' alt='' />
                    <div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, adipisci.</p>
                        <span className='font-light text-xs'>2 mins ago</span>

                    </div>
                </div>

                <div className='w-[70%] p-3 rounded-xl bg-purple-600 flex gap-2'>
                    <img className='w-[45px] h-[45px] rounded-full' src='./avatar.png' alt='' />
                    <div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, adipisci.</p>
                        <span className='font-light text-xs'>2 mins ago</span>

                    </div>
                </div>
                <div className='w-[70%] p-3 rounded-xl bg-black/50 flex flex-row-reverse gap-2 self-end'>
                    <img className='w-[45px] h-[45px] rounded-full' src='./avatar.png' alt='' />
                    <div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, adipisci.</p>
                        <span className='font-light text-xs'>2 mins ago</span>

                    </div>
                </div>

                <div className='w-[70%] p-3 rounded-xl bg-purple-600 flex gap-2'>
                    <img className='w-[45px] h-[45px] rounded-full' src='./avatar.png' alt='' />
                    <div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, adipisci.</p>
                        <span className='font-light text-xs'>2 mins ago</span>

                    </div>
                </div>
                <div className='w-[70%] p-3 rounded-xl bg-black/50 flex flex-row-reverse gap-2 self-end'>
                    <img className='w-[45px] h-[45px] rounded-full' src='./avatar.png' alt='' />
                    <div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, adipisci.</p>
                        <span className='font-light text-xs'>2 mins ago</span>

                    </div>
                </div>

                <div ref={bottomRef} />

            </div>
            <div className='flex items-center px-2 gap-4'>
                <img className='w-8 h-8 cursor-pointer' src='./img.png' alt='' />
                <div className='flex-1 flex items-center gap-4'>
                    <input className='w-full bg-black/40 outline-none p-5 rounded-md' value={message} onChange={(e) => setMessage(e.target.value)} type='text' placeholder='Type a message...' />
                    <div className='relative'>
                        <img onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)} className='w-8 h-6 cursor-pointer' src='./emoji.png' alt='' />
                        <div className={`absolute bottom-8 left-0`}>
                            <EmojiPicker open={isEmojiPickerOpen} onEmojiClick={(emo) => handleEmojiClick(emo.emoji)} theme={Theme.DARK} />
                        </div>
                    </div>
                    <button className='bg-blue-600/60 hover:bg-blue-600 transition-colors duration-300 px-4 py-2 rounded-md'>Send</button>
                </div>
            </div>
        </div>
    )
}

export default Chat