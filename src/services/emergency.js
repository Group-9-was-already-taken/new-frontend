import api from './api';

export const getEmergencyResources = async () => {
  const response = await api.get('/emergency-resources');
  return response.data;
};

export const getProfessionalLinks = async () => {
  const response = await api.get('/professional-links');
  return response.data;
};

// Helper function to get all emergency-related information
export const getAllEmergencyInfo = async () => {
  const [resources, links] = await Promise.all([
    getEmergencyResources(),
    getProfessionalLinks()
  ]);
  
  return {
    resources,
    professionalLinks: links
  };
};
