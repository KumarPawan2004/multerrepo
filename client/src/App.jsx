import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setMessage('');
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setMessage('Please select a file first.');
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', selectedFile);

      await axios.post('http://localhost:3001/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('🎉 File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('❌ Error uploading file.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container">
      <div className="upload-card">
        <h2>📁 Upload a File</h2>
        <p>Select a file to upload it to the server.</p>
        <input type="file" onChange={handleFileChange} className="file-input" />
        <button onClick={handleSubmit} disabled={uploading} className="upload-button">
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default App;
