import api from './api';

export const getInformation = async () => {
  const response = await api.get('/information');
  return response.data;
};

export const getFooterContent = async () => {
  const response = await api.get('/footer');
  return response.data;
};
