const CHAT_HISTORY_KEY = 'chatHistory';

export const saveChatHistory = async (sessionId, messages) => {
  let chatHistory = JSON.parse(localStorage.getItem(CHAT_HISTORY_KEY)) || {};
  chatHistory[sessionId] = messages;
  localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(chatHistory));
};

export const getChatHistory = async (sessionId) => {
  const chatHistory = JSON.parse(localStorage.getItem(CHAT_HISTORY_KEY)) || {};
  return chatHistory[sessionId] || [];
};

export const getSessionIds = () => {
  const chatHistory = JSON.parse(localStorage.getItem(CHAT_HISTORY_KEY)) || {};
  return Object.keys(chatHistory);
};
