import React from 'react'
import gsap from 'gsap'
import Header from '../components/Header'
import FolderGrid from '../components/FolderGrid'


const Home: React.FC = () => {
    return (
        <>
            <div className='flex flex-col bg-[#0f0f0f] min-h-screen min-w-screen'>
                <Header />
                <FolderGrid />
            </div>
        </>
    )
}

export default Home