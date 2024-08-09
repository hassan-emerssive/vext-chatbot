import React, { useState } from 'react';

const ChatSessionManager = ({ setCurrentSession }) => {
  const [sessions, setSessions] = useState([]);

  const createNewSession = () => {
    const newSessionId = `session-${Date.now()}`;
    setSessions([...sessions, newSessionId]);
    setCurrentSession(newSessionId);
  };

  return (
    <div>
      <button onClick={createNewSession}>New Chat Session</button>
      <div>
        {sessions.map((session) => (
          <div
            key={session}
            className="ChatSession"
            onClick={() => setCurrentSession(session)}
          >
            {session}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSessionManager;
