// src/App.tsx
import React, { useEffect, useState } from 'react';
// import logo from './logo.svg'; // Not used in this context
import './App.css'; // Make sure this CSS file is used for any global styles if needed
import Home from './pages/Home'; // Assuming you have a Home component
import FileGrid from './components/FileGrid'; // This is the main component for the /Files route
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AddFiles from './pages/AddFiles';
import AdminUser from './pages/AdminUser'

function App() {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {

  }, [isLogin])
  return (
    <div className="w-full h-full">
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Files' element={<FileGrid />} />
          <Route path='/folders' element={<Home />} />
          <Route path='/addFiles' element={<AddFiles />} />
          <Route path='/adminportal' element={<AdminUser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;