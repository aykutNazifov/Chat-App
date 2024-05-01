import React from 'react'
import FriendList from '../components/FriendsList'
import Chat from '../components/Chat'
import Details from '../components/Details'
import { useChatStore } from '../hooks/useChat'

const ChatPage = () => {
    const { chatId } = useChatStore()
    return (
        <div className='grid grid-cols-4 h-full'>
            <div className='h-full overflow-hidden'><FriendList /></div>
            <div className='col-span-2 h-full overflow-hidden'>
                {chatId && <Chat />}
            </div>
            <div>
                {chatId && <Details />}
            </div>
        </div>
    )
}

export default ChatPage