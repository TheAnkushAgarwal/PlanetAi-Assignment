// src/components/QuestionForm.js

import React, { useState } from 'react';
import { askQuestion } from '../services/api';

// Component for submitting questions about the uploaded document
const QuestionForm = ({ documentId, onNewMessage }) => {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  // Handles form submission, prevents empty questions
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim() || !documentId) return;

    setLoading(true);
    try {
      const result = await askQuestion(documentId, question);
      onNewMessage(question, result.answer);
      setQuestion('');
    } catch (err) {
      console.error('Error processing question:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Send a message..."
        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-full border focus:outline-none focus:border-blue-500"
        disabled={loading}
      />
      <button 
        type="submit"
        disabled={loading}
        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 rotate-90" fill="currentColor" viewBox="0 0 24 24">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>
      </button>
    </form>
  );
};

export default QuestionForm;
