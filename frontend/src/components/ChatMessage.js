import React from 'react';

// Component to display chat messages with different styles for user and AI responses
const ChatMessage = ({ type, content }) => {
  return (
    <div className="flex gap-4">
      {type === 'user' ? (
        <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center">
          S
        </div>
      ) : (
        <div className="w-8 h-8 rounded-full bg-white border flex items-center justify-center">
          <img src="/ai.png" alt="AI" className="w-6 h-6" />
        </div>
      )}
      <div className="flex-1">
        <p className="text-gray-800">{content}</p>
      </div>
    </div>
  );
};

export default ChatMessage; 