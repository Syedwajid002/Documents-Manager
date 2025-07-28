import { Close } from '@mui/icons-material';
import React from 'react';

type FileDetailsPanelProps = {
    file: {
        id: number;
        thumbnail: string;
        size: string;
    };
    onClose: () => void;
};

const FileDetailsPanel: React.FC<FileDetailsPanelProps> = ({ file, onClose }) => {

    const handleClose = () => {
        onClose();
    };

    return (
        <div className='w-96 bg-[#1e1e1e] text-white p-4 border-l-2 border-[#2f2f2f] flex-shrink-0'>
            <Close
                className='mb-2 text-gray-400 hover:text-white cursor-pointer float-right'
                onClick={handleClose}
                sx={{ fontSize: 24 }}
            />
            <div className='clear-right'></div>

            <div className='mb-4 flex justify-center'>
                <img src={file.thumbnail} alt="Selected File" className='w-full max-h-96 object-contain rounded-lg border border-[#2f2f2f]' />
            </div>
            <h2 className='text-lg font-semibold mb-2'>File Details</h2>
            <p className='text-gray-400 text-sm'>Size: {file.size}</p>

        </div>
    );
};

export default FileDetailsPanel;