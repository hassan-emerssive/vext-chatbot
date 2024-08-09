import React, { useState, useEffect } from 'react';
import ChatList from './components/ChatList';
import Chat from './components/Chat';
import IntroScreen from './components/IntroScreen';
import { getSessionIds } from './services/chatHistoryService';
import './App.css';

function App() {
  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const loadSessions = () => {
      const sessionIds = getSessionIds();
      setSessions(sessionIds);
    };
    loadSessions();
  }, []);

  const handleNewSession = () => {
    const newSessionId = generateUniqueToken();
    setSessions([newSessionId, ...sessions]);
    setCurrentSessionId(newSessionId);
    setShowIntro(false);
  };

  const handleSessionSelect = (sessionId) => {
    setCurrentSessionId(sessionId);
    setShowIntro(false);
  };

  return (
    <div className="App">
      <div className="app-container">
        <ChatList 
          sessions={sessions} 
          onSelectSession={handleSessionSelect} 
          onNewSession={handleNewSession} 
        />
        {showIntro ? <IntroScreen /> : <Chat sessionId={currentSessionId} />}
      </div>
    </div>
  );
}

function generateUniqueToken() {
  const d = new Date();
  return 'session-' + d.getTime();
  // Math.random().toString(36).substr(2, 9);
}

export default App;
