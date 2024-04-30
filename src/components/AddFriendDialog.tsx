import React, { useEffect, useRef } from 'react'

interface IAddFriendsDialog {
    closeDialog: () => void;
}

const AddFriendDialog: React.FC<IAddFriendsDialog> = ({ closeDialog }) => {
    const dialogRef = useRef<HTMLDivElement>(null)

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

    return (
        <div className='absolute inset-0 m-auto flex items-center justify-center flex-col gap-4'>
            <div ref={dialogRef} className='bg-black/80 p-8 rounded-lg'>

                <form className='flex items-center gap-2 mb-4 pb-4 border-b border-b-solid border-b-blue-600'>
                    <input className='p-2 outline-none rounded-md' placeholder='Username' name='username' />
                    <button className='bg-blue-600/60 hover:bg-blue-600 transition-colors duration-300 p-2 rounded-md'>Search</button>
                </form>
                <div>
                    <div className='flex items-center justify-between mb-4'>
                        <div className='flex items-center gap-2'>
                            <img className='w-[40px] h-[40px] rounded-full object-cover' src='./avatar.png' alt='' />
                            <p>Jnae</p>
                        </div>
                        <button className='bg-white text-black p-2 rounded-md font-medium'>Add Friend</button>
                    </div>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <img className='w-[40px] h-[40px] rounded-full object-cover' src='./avatar.png' alt='' />
                            <p>Jnae</p>
                        </div>
                        <button className='bg-white text-black p-2 rounded-md font-medium'>Add Friend</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddFriendDialog