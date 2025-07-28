import React from 'react';
import ImageIcon from '@mui/icons-material/Image';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
type FileCardProps = {
    thumbnail: string;
    size: string;
    isSelected: boolean;
    onClick: () => void;
};

const FileCard: React.FC<FileCardProps> = ({ thumbnail, size, isSelected, onClick }) => {
    return (
        <div
            className={`bg-[#1e1e1e] rounded-lg overflow-hidden border-2 group relative cursor-pointer ${isSelected ? 'border-red-600' : 'border-[#2f2f2f]'
                }`}
            onClick={onClick}
        >
            <div className='w-full h-64 flex justify-center items-center bg-[#454442] relative p-12'>
                <img src={thumbnail} alt="File Thumbnail" className='w-full h-full object-cover' />
                <div className='absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <FileDownloadIcon sx={{ fontSize: 60, color: 'white' }} className='cursor-pointer' />
                </div>
            </div>

            <div className='p-4 text-white flex justify-between items-center'>
                <div className='flex items-center'>
                    <ImageIcon sx={{ fontSize: 20, color: 'gray' }} className='mr-2' />
                    <div>
                        <p className='text-sm'>File</p>
                        <p className='text-xs text-gray-400'>{size}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileCard;