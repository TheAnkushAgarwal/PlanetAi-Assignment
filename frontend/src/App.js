// src/App.js

import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import QuestionForm from './components/QuestionForm';
import ChatMessage from './components/ChatMessage';

// Main App component that handles document upload and chat functionality

const App = () => {
  // State for managing uploaded document and chat history
  const [documentId, setDocumentId] = useState(null);
  const [documentInfo, setDocumentInfo] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);

  // Callback when file is successfully uploaded
  const handleUploadSuccess = (data) => {
    setDocumentId(data.id);
    setDocumentInfo(data);
  };

  // Adds new Q&A pair to chat history
  const handleNewMessage = (question, answer) => {
    setChatHistory([
      ...chatHistory,
      { type: 'user', content: question },
      { type: 'ai', content: answer }
    ]);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex justify-between items-center p-2 sm:p-4 border-b">
        <div className="flex items-center">
          <img src="/logo.png" alt="AI Planet Logo" className="h-6 sm:h-8" />
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          {documentInfo && (
            <div className="flex items-center text-green-500 text-sm">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="hidden sm:inline">{documentInfo.filename || 'demo.pdf'}</span>
            </div>
          )}
          <FileUpload onUploadSuccess={handleUploadSuccess} />
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-auto p-2 sm:p-4">
        <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
          {chatHistory.map((message, index) => (
            <ChatMessage key={index} type={message.type} content={message.content} />
          ))}
        </div>
      </div>

      {/* Question Input */}
      <div className="border-t p-2 sm:p-4">
        <div className="max-w-3xl mx-auto">
          <QuestionForm documentId={documentId} onNewMessage={handleNewMessage} />
        </div>
      </div>
    </div>
  );
};

export default App;
