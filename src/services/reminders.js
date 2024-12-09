import api from './api';

export const createReminder = async (reminderData) => {
  const response = await api.post('/reminders', reminderData);
  return response.data;
};

export const getReminders = async () => {
  const response = await api.get('/reminders');
  return response.data;
};

export const updateReminder = async (reminderId, updates) => {
  const response = await api.put(`/reminders/${reminderId}`, updates);
  return response.data;
};

export const deleteReminder = async (reminderId) => {
  await api.delete(`/reminders/${reminderId}`);
};
