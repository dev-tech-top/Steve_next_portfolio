import React from 'react';

const ChatTypingIndicator = ({ AVATARS, typingText }) => (
  <div style={{ display: 'flex', alignItems: 'center', margin: '8px 0', position: 'sticky', bottom: 0 }}>
    <span style={{ marginRight: 8 }}>{AVATARS.bot}</span>
    <span style={{ background: '#f1f8e9', padding: '8px 12px', borderRadius: 16, display: 'inline-block', color: '#222', minWidth: 120, fontStyle: 'normal' }}>
      {typingText}
    </span>
  </div>
);

export default ChatTypingIndicator;
