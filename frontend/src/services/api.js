// src/services/api.js

import axios from 'axios';

// Base URL for all API requests
const API_URL = 'http://localhost:8000';

// Handles PDF file upload to the backend
export const uploadPdf = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await axios.post(`${API_URL}/upload/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

// Sends questions about the uploaded document to the backend
export const askQuestion = async (documentId, question) => {
  const response = await axios.post(`${API_URL}/ask/`, {
    document_id: documentId,
    question: question,
  });

  return response.data;
};
