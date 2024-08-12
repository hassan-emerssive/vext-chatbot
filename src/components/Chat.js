import React, { useState, useEffect } from "react";
import { fetchVextData } from "../services/vextService";
import {
  saveChatHistory,
  getChatHistory,
} from "../services/chatHistoryService";

const LoadingSpinner = () => (
  <div className="loading-opacity-spinner">
    <div className="opacity-spinner"><h1 style={{fontSize: "36px"}}>...</h1></div>
  </div>
);

const Chat = ({ sessionId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadHistory = async () => {
      const history = await getChatHistory(sessionId);
      setMessages(history);
    };
    loadHistory();
  }, [sessionId]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { text: input, user: true };
    setMessages([...messages, userMessage]);
    setLoading(true);
    try {
      const response = await fetchVextData(input);
      const botMessage = { text: response.text, user: false };
      const updatedMessages = [...messages, userMessage, botMessage];
      setMessages(updatedMessages);

      try {
        await saveChatHistory(sessionId, updatedMessages);
      } catch (saveError) {
        console.error("Failed to save chat history:", saveError);
      }
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages([
        ...messages,
        userMessage,
        { text: "Error fetching response", user: false },
      ]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.user ? "user-message" : "bot-message"}
          >
            {msg.text}
          </div>
        ))}
        {loading && <LoadingSpinner />}
      </div>
      
      <div className="input-container">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="chat-input"
          placeholder="Enter a message"
        />
        <button onClick={handleSend} disabled={loading} className="send-button">
          {loading ? "Loading..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chat;
