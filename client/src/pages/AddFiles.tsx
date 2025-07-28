import React from 'react'

const AddFiles = () => {
    return (
        <div className='min-h-screen flex justify-center items-center flex-col '>
            <input type="text" className='bg-gray-600 mt-2' placeholder='img' />
            <input type="text" className='bg-gray-500 mt-2' placeholder='name' />
            <button className=' mt-2 bg-red-600 p-4 text-white'>Send</button>
        </div>
    )
}

export default AddFiles
