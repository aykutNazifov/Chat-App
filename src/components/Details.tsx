import React from 'react'

const Details = () => {
    return (
        <div>
            <div className='flex items-center flex-col gap-4 pb-2 mb-2 border-b order-b-solid border-b-white/60'>
                <img className='w-[100px] h-[100px] rounded-full object-cover' src='./avatar.png' alt='' />
                <h2 className='font-medium'>Jane Doe</h2>
                <p className='text-[12px]'>Lorem ipsum dolor sit amet.</p>
            </div>
            <div>
                <button className='px-5 py-2 bg-red-600/80 hover:bg-red-600 transition-colors duration-300 w-full rounded-md font-medium'>Block User</button>
            </div>
        </div>
    )
}

export default Details