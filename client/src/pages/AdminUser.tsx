import React, { use, useEffect, useState } from 'react';
import FileCard from '../components/FileCard';
import Header from '../components/Header';
import { Breadcrumbs } from '@mui/material';
import axios from 'axios';
import FileDetails from '../components/FileDetails';
import { useNavigate } from 'react-router-dom';
type FileItem = {
  id: number;
  thumbnail: string;
  size: string;
};

const AdminUser = () => {

  const navigate = useNavigate();

  const [data, setData] = useState<FileItem[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [isAddPanelOpen, setIsAddPanelOpen] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [newFileUrl, setNewFileUrl] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Files');


  const getData = () => {
    axios
      .get('http://localhost:5000/getData/photos')
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleAddFile = async () => {
    if (!newFileName || !newFileUrl) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/getData/addPhotos', {
        id: 1,
        thumbnail: newFileUrl,
        size: newFileName,
      });

      if (response.status === 200) {
        alert('File added successfully');
        setNewFileName('');
        setNewFileUrl('');
        setIsAddPanelOpen(false);
        getData();
      } else {
        alert('Error adding file');
      }
    } catch (error) {
      console.error('Error adding file:', error);
      alert('Error adding file');
    }
  };

  const handleFileClick = (file: FileItem) => {
    setSelectedFile(selectedFile?.id === file.id ? null : file);
  };

  const handleCloseDetails = () => {
    setSelectedFile(null);
  };

  useEffect(() => {
    try {
      const role = localStorage.getItem("role");
      if (role == 'user' || '') {
        navigate('/folders')
      }
    } catch (err) {

    }
    getData();
  }, []);

  return (
    <div className="bg-black min-h-screen flex flex-col text-white relative">
      <Header />
      <Breadcrumbs />
      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-[#1E1E1E] p-4 space-y-4">
          {[
            'All Files',
            'Brochures',
            'Offline Marketing',
            'Reels',
            'Static Posts',
            'LOGOs',
            'WEBSITES',
          ].map((label, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(label)}
              className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-200
      ${selectedCategory === label
                  ? 'bg-red-600 text-white font-bold'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            >
              {label}
            </button>
          ))}

        </div>

        <div className="flex-grow bg-black p-6 overflow-y-auto">

          <div className="flex justify-between items-center mb-4">
            <div className="text-xl font-semibold">{data.length} file(s) available</div>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsAddPanelOpen(true)}
                className="bg-red-600 px-4 py-2 rounded-md"
              >
                Add File
              </button>
              <button className="bg-red-600 px-4 py-2 rounded-md">Add Files</button>
            </div>
          </div>

          {/* File Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.map((file) => (
              <FileCard
                key={file.id}
                thumbnail={file.thumbnail}
                size={file.size}
                isSelected={!!selectedFile && selectedFile.id === file.id}
                onClick={() => handleFileClick(file)}
              />
            ))}
          </div>
        </div>
      </div>

      {selectedFile && (
        <FileDetails
          file={selectedFile}
          onClose={handleCloseDetails}
        />
      )}

      {isAddPanelOpen && (
        <div className="fixed top-0 right-0 w-full sm:w-[400px] h-full bg-gray-900 shadow-lg z-50 transition-all duration-300">
          <div className="flex items-center justify-between px-6 py-4 bg-red-600">
            <h2 className="text-lg font-semibold text-white">Add File</h2>
            <button
              onClick={() => setIsAddPanelOpen(false)}
              className="text-white text-2xl font-bold"
            >
              &times;
            </button>
          </div>

          <div className="p-6 space-y-4 text-white">
            <div className="border-2 border-dashed border-gray-500 p-6 rounded-md text-center cursor-pointer hover:border-gray-300 transition">
              <p className="text-sm text-gray-400">Drag & drop a file here, or click to select one</p>
            </div>

            <div>
              <label htmlFor="filename" className="block text-sm text-gray-300 mb-1">File Size</label>

              <input
                id="url"
                type="text"
                placeholder="Image URL"
                value={newFileUrl}
                onChange={(e) => setNewFileUrl(e.target.value)}
                className="w-full px-3 py-2 mt-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <input
                id="filename"
                type="text"
                placeholder="e.g. 2.4 MB"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setIsAddPanelOpen(false)}
                className="bg-gray-700 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleAddFile}
                className="bg-red-600 px-4 py-2 rounded-md"
              >
                Add File
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUser;
