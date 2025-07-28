// src/components/FileGrid.tsx
import React, { useEffect, useState } from 'react';
import FileCard from './FileCard';
import FileDetailsPanel from './FileDetails'; // Correct import name
import Header from './Header';
import Breadcrumbs from './Breadcrumbs';
import axios from 'axios';

const ITEMS_PER_LOAD = 8;

type FileItem = {
    id: number;
    thumbnail: string;
    size: string;
};

const FileGrid: React.FC = () => {
    const [visibleItems, setVisibleItems] = useState(ITEMS_PER_LOAD);
    const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
    const [data, setData] = useState([]);

    const getData = () => {
        axios
            .get('http://localhost:5000/getData/photos')
            .then((response) => {
                console.log(response.data.data)
                setData(response.data.data);
            })
            .catch((error) => {
                console.error("Error aaya kab: fetching data:", error);
            });
    };
    useEffect(() => {
        getData();
    }, [])

    const handleShowMore = () => {
        setVisibleItems(prevVisibleItems => prevVisibleItems + ITEMS_PER_LOAD);
    };

    const handleFileClick = (file: FileItem) => {
        // If the same file is clicked again, deselect it
        if (selectedFile && selectedFile.id === file.id) {
            setSelectedFile(null);
        } else {
            setSelectedFile(file);
        }
    };
    const handleCloseDetails = () => {
        setSelectedFile(null);
    };

    return (
        <div className='bg-black min-h-screen flex flex-col'>
            <Header />
            <Breadcrumbs />
            <div className="flex flex-grow">
                <div className='p-8 flex-grow'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-6'>
                        {data.map((file: FileItem) => (
                            <FileCard
                                key={file.id}
                                thumbnail={file.thumbnail}
                                size={file.size}
                                isSelected={!!selectedFile && selectedFile.id === file.id}
                                onClick={() => handleFileClick(file)}
                            />
                        ))}
                    </div>

                    {visibleItems < data.length && (
                        <div className='flex justify-center mt-8'>
                            <button
                                onClick={handleShowMore}
                                className='bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-colors duration-200'
                            >
                                Show More
                            </button>
                        </div>
                    )}
                </div>

                {selectedFile && (
                    <FileDetailsPanel
                        file={selectedFile}
                        onClose={handleCloseDetails}
                    />
                )}
            </div>
        </div>
    );
};

export default FileGrid;