import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UploadedFiles = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    // Fetch the list of available files when the component mounts
    loadFileList();
  }, []);

  const loadFileList = () => {
    axios.get('/upload_files')
      .then(response => {
        setFiles(response.data);
      })
      .catch(error => console.error('Error:', error));
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div>
      <h2>Available Files:</h2>
      <ul>
        {files.map(file => (
          <li key={file}>
            <a href={`http://localhost:8080/upload_files/${file}`} target="_blank" rel="noopener noreferrer">
              {file}
            </a>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default UploadedFiles;
