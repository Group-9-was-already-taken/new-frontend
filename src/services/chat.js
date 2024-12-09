import api from './api';

export const getChatMessages = async (since = null) => {
  const params = since ? { since: since.toISOString() } : {};
  const response = await api.get('/chat-messages', { params });
  return response.data;
};

export const postChatMessage = async (message) => {
  const response = await api.post('/chat-messages', { message });
  return response.data;
};

// Helper function to poll for new messages
export let messagePollingInterval = null;

export const startMessagePolling = (callback, interval = 5000) => {
  if (messagePollingInterval) return;

  let lastMessageTime = new Date();
  messagePollingInterval = setInterval(async () => {
    try {
      const messages = await getChatMessages(lastMessageTime);
      if (messages.length > 0) {
        lastMessageTime = new Date(messages[0].created_at);
        callback(messages);
      }
    } catch (error) {
      console.error('Error polling messages:', error);
    }
  }, interval);
};

export const stopMessagePolling = () => {
  if (messagePollingInterval) {
    clearInterval(messagePollingInterval);
    messagePollingInterval = null;
  }
};
