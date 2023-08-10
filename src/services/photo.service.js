import axios from 'axios';

const API_BASE_URL = process.env.API_URL; // Change this to your backend URL

const apiService = axios.create({
  baseURL: API_BASE_URL,
});

export const uploadPhoto = async (file) => {
  const formData = new FormData();
  formData.append('photo', file);

  try {
    const response = await apiService.post('/photos', formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addComment = async (photoId, text) => {
  try {
    const response = await apiService.patch(`/photos/${photoId}/comments`, { comments: { text } });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPhotos = async () => {
  try {
    const response = await apiService.get('/photos');
    return response.data;
  } catch (error) {
    throw error;
  }
};
