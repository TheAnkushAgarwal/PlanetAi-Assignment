// src/components/FileUpload.js

import React from 'react';
import { uploadPdf } from '../services/api';

// Component for handling PDF file uploads with validation and error handling
const FileUpload = ({ onUploadSuccess }) => {
  const [error, setError] = React.useState('');

  // Handles file selection, validates PDF type, and triggers upload
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    setError('');

    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file only');
      return;
    }

    try {
      const result = await uploadPdf(file);
      onUploadSuccess(result);
    } catch (err) {
      console.error('Error uploading file:', err);
      setError('Failed to upload file. Please try again.');
    }
  };

  return (
    <div>
      <label className="flex items-center px-2 sm:px-4 py-1.5 sm:py-2 border rounded-full hover:bg-gray-50 cursor-pointer text-sm sm:text-base">
        <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        <span className="hidden sm:inline">Upload PDF</span>
        <span className="sm:hidden">+</span>
        <input
          type="file"
          onChange={handleFileChange}
          accept=".pdf"
          className="hidden"
        />
      </label>
      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
    </div>
  );
};

export default FileUpload;
