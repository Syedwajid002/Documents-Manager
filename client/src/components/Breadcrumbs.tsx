// src/components/Breadcrumbs.tsx
import React from 'react';
import HomeIcon from '@mui/icons-material/Home';

const Breadcrumbs: React.FC = () => {
    return (
        <div className='bg-black p-4 flex items-center text-gray-400 text-sm border-b border-[#2f2f2f]'>
            <HomeIcon sx={{ fontSize: 18, color: 'gray' }} className='mr-2' />
            <span className='mr-1'>/</span>
            <span className='mr-1'>All Folders</span>
            <span className='mr-1'>/</span>
        </div>
    );
};

export default Breadcrumbs;