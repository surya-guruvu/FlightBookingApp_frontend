import React, { useState } from 'react';
import axios from 'axios'
// import './FileUpload.css' 

const FileUpload = ()=>{

    const [name,setName] = useState('');
    const [selectedFiles,setSelectedFiles] = useState([]);
    const [results,setResults] = useState('');

    const handleSubmit = (e)=>{
        e.preventDefault();
        setResults('');

        var formdata = new FormData();
        formdata.append('name',name);
        
        for(let i=0;i<selectedFiles.length;i++){
            formdata.append('files',selectedFiles[i]);
        }

        axios.post('/upload_files',formdata,{headers:{"Content-Type":"multipart/form-data"}})
        .then((res)=>{
            console.log(res.data.message);
        })
        .catch((err)=>{
            console.log("Error:",err);
        });
        const fileInput = document.getElementById('files');
        if (fileInput) {
          fileInput.value = '';
        }

        setName('');
        setSelectedFiles([]);
    }
    
    return (
        <div className='container'>
            <h1>File Upload</h1>
            <form id="form" onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='name'>Name: </label>
                    <input 
                    id='name' 
                    type='text'
                    placeholder='Enter your Name'
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="files">Select files: </label>
                    <input
                        id="files"
                        type="file"
                        multiple
                        onChange={(e)=>setSelectedFiles(e.target.files)}
                    />
                </div>
                <button className="submit-btn" type="submit">Upload</button>
            </form>
        </div>
    );
}

export default FileUpload;
