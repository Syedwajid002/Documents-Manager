import React from 'react';
import FolderIcon from '@mui/icons-material/Folder';
import ShareIcon from '@mui/icons-material/Share';
import LinkIcon from '@mui/icons-material/Link';
import logo from './../Assets/logo.png';
import { useNavigate } from 'react-router-dom';

const FolderCard = ({ name, totalItems }: any) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/Files');
    }

















    return (
        // Add 'group' class to the parent div for hover effect
        <div className='group bg-[#1e1e1e] w-80 min-w-80  min-h-56 flex flex-col justify-between items-start border-2 border-[#2f2f2f] rounded-2xl p-4 relative overflow-hidden'>
            {/* Container for the share and link icons */}
            {/* Initially hidden (opacity-0) and visible on group hover (group-hover:opacity-100) */}
            <div className='absolute top-4 right-4 flex gap-2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                <ShareIcon sx={{ fontSize: 20 }} />
                <LinkIcon sx={{ fontSize: 20 }} />
            </div>

            {/* Main Folder Icon and Logo */}
            <div className='flex flex-col items-center w-full mt-4 flex-grow justify-center'
                onClick={handleClick}
            >
                <FolderIcon sx={{ fontSize: 100, color: 'gray' }} />
                <img src={logo} alt="Dezign Shark Logo" className='w-32 mt-[-20px] object-contain' />
            </div>

            {/* Folder Name and Total Items at the bottom-left */}
            <div className='flex items-center mt-4 w-full'>
                <FolderIcon sx={{ fontSize: 24, color: 'gray' }} />
                <div className='ml-2'>
                    <p className='text-white text-lg font-semibold'>{name}</p>
                    <p className='text-gray-400 text-sm'>Total Items: {totalItems}</p>
                </div>
            </div>
        </div>
    );
};

export default FolderCard;