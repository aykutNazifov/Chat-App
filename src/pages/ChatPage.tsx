import React from 'react'
import FriendList from '../components/FriendsList'
import Chat from '../components/Chat'
import Details from '../components/Details'

const ChatPage = () => {
    return (
        <div className='grid grid-cols-4 h-full'>
            <div className='h-full overflow-hidden'><FriendList /></div>
            <div className='col-span-2 h-full overflow-hidden'><Chat /></div>
            <div><Details /></div>
        </div>
    )
}

export default ChatPage