import api from './api';

// Mood logging
export const logMood = async (moodData) => {
  const response = await api.post('/mood-logs', moodData);
  return response.data;
};

export const getMoodLogs = async (startDate, endDate) => {
  const params = {};
  if (startDate) params.start_date = startDate;
  if (endDate) params.end_date = endDate;
  
  const response = await api.get('/mood-logs', { params });
  return response.data;
};

// Activity logging
export const logActivity = async (activityData) => {
  const response = await api.post('/activity-logs', activityData);
  return response.data;
};

export const getActivityLogs = async (startDate, endDate) => {
  const params = {};
  if (startDate) params.start_date = startDate;
  if (endDate) params.end_date = endDate;
  
  const response = await api.get('/activity-logs', { params });
  return response.data;
};

// Get combined log history
export const getLogHistory = async (options = {}) => {
  const response = await api.get('/log-history', { params: options });
  return response.data;
};
