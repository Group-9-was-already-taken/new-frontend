import api from './api';

export const getExercises = async (period) => {
  const response = await api.get('/exercises', {
    params: { period }
  });
  return response.data;
};

// Helper function to get exercises for specific times of day
export const getMorningExercises = () => getExercises('morning');
export const getAfternoonExercises = () => getExercises('afternoon');
export const getEveningExercises = () => getExercises('evening');
