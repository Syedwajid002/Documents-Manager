import React, { useEffect, useState } from 'react';
import FolderCard from './FolderCard';
import folderData from '../Assets/data'; // Import data
import axios from 'axios';

const FolderGrid: React.FC = () => {
    const [data, setData] = useState([]);

    const getData = () => {
        axios
            .get('http://localhost:5000/getData/getFolders')
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
    return (
        <div className='p-8 bg-black min-h-screen'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10'>
                {/* Rely on TypeScript's inference for 'folder' object based on 'folderData' */}
                {data.map((folder: any) => ( // No explicit type needed for 'folder' here
                    <FolderCard
                        key={folder.id}
                        name={folder.name}
                        totalItems={folder.totalItems}
                        showIcons={folder.name === 'Reels'}
                    />
                ))}
            </div>
        </div>
    );
};

export default FolderGrid;