import React, { useState } from 'react';

const ChatMessage = ({ msg, realIdx, AVATARS, botTyping, typingText, copiedIdx, onCopy, androidStyle }) => {
  const [hovered, setHovered] = useState(false);
  const isUser = msg.from === 'user';
  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} items-end my-2 relative group`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* User copy button */}
      {isUser && (
        <button
          onClick={() => onCopy(msg.text, realIdx)}
          title="Copy to clipboard"
          className={`bg-none border-none p-0 cursor-pointer outline-none mr-1 mb-0.5 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-end justify-center relative ${copiedIdx === realIdx ? 'opacity-100' : ''}`}
        >
          {copiedIdx === realIdx ? (
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="16" fill="#43a047"/>
              <path d="M10 17l4 4 8-8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="7" y="6" width="18" height="20" rx="4" fill="#f4f6fa" stroke="#90caf9" strokeWidth="2"/>
              <rect x="11" y="2.5" width="10" height="5" rx="2.5" fill="#90caf9" stroke="#1976d2" strokeWidth="1.5"/>
              <rect x="11" y="12" width="10" height="2" rx="1" fill="#bbdefb" />
              <rect x="11" y="17" width="10" height="2" rx="1" fill="#bbdefb" />
              <rect x="11" y="22" width="7" height="2" rx="1" fill="#bbdefb" />
            </svg>
          )}
        </button>
      )}
      {/* Bot avatar */}
      {!isUser && (
        <span className="mr-1 text-2xl drop-shadow-sm select-none">{AVATARS.bot}</span>
      )}
      {/* Chat bubble */}
      <span
        className={`inline-block max-w-[95%] px-3 py-1.5 rounded-xl font-normal text-sm break-words relative z-0 shadow-sm
          ${isUser
            ? 'bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-100 text-blue-900 rounded-br-lg ml-6'
            : 'bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-100 text-gray-800 rounded-bl-lg mr-6'}
          ${androidStyle ? (isUser ? 'self-end' : 'self-start') : ''}
          ${!isUser && !botTyping && realIdx !== undefined && realIdx === copiedIdx ? 'ring-2 ring-blue-200 animate-pulse' : ''}
        `}
      >
        <span className="flex-1 min-w-0 break-words">
          {msg.from === 'bot' && botTyping && typingText && realIdx === undefined ? '' : msg.text}
        </span>
      </span>
      {/* Bot copy button */}
      {!isUser && (
        <button
          onClick={() => onCopy(msg.text, realIdx)}
          title="Copy to clipboard"
          className={`bg-none border-none p-0 cursor-pointer outline-none ml-1 mb-0.5 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-end justify-center relative ${copiedIdx === realIdx ? 'opacity-100' : ''}`}
        >
          {copiedIdx === realIdx ? (
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="16" fill="#43a047"/>
              <path d="M10 17l4 4 8-8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="7" y="6" width="18" height="20" rx="4" fill="#f4f6fa" stroke="#90caf9" strokeWidth="2"/>
              <rect x="11" y="2.5" width="10" height="5" rx="2.5" fill="#90caf9" stroke="#1976d2" strokeWidth="1.5"/>
              <rect x="11" y="12" width="10" height="2" rx="1" fill="#bbdefb" />
              <rect x="11" y="17" width="10" height="2" rx="1" fill="#bbdefb" />
              <rect x="11" y="22" width="7" height="2" rx="1" fill="#bbdefb" />
            </svg>
          )}
        </button>
      )}
      {/* User avatar */}
      {isUser && <span className="ml-1 text-2xl font-bold drop-shadow-sm select-none">{AVATARS.user}</span>}
    </div>
  );
};

export default ChatMessage;
