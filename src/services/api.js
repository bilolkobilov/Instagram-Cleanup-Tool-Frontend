// src/services/api.js
const API_URL = process.env.REACT_APP_API_URL || 'https://instagram-cleanup-tool-backend.vercel.app';

export const login = async (username, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
    credentials: 'include', // This is important for cookies
  });
  return response.json();
};

export const startDeletion = async (deleteType, maxItems) => {
  const requestData = {
    delete_reels: deleteType === 'reels',
    delete_messages: deleteType === 'messages',
    delete_posts: deleteType === 'posts',
    max_items: maxItems || null,
  };
  
  const response = await fetch(`${API_URL}/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
    credentials: 'include', // This is important for cookies
  });
  return response.json();
};

export const getStats = async () => {
  const response = await fetch(`${API_URL}/stats`, {
    credentials: 'include', // This is important for cookies
  });
  return response.json();
};

export const cancelDeletion = async () => {
  const response = await fetch(`${API_URL}/cancel`, { 
    method: 'POST',
    credentials: 'include', // This is important for cookies
  });
  return response.json();
};

export const logout = async () => {
  const response = await fetch(`${API_URL}/logout`, { 
    method: 'POST',
    credentials: 'include', // This is important for cookies
  });
  return response.json();
};