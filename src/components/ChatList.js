import React from 'react';

const ChatList = ({ sessions, onSelectSession, onNewSession }) => {
  return (
    <div className="chat-list-container">
      <button onClick={onNewSession} className="new-session-button">+ New Chat</button>
      <ul className="session-list">
        {sessions.map((id) => (
          <li key={id} onClick={() => onSelectSession(id)} className="session-item">
            {id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
