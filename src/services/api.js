// src/services/api.js
const API_URL = process.env.REACT_APP_API_URL || '';

export const login = async (username, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  return response.json();
};

export const startDeletion = async (deleteType, maxItems) => {
  const requestData = {
    delete_reels: deleteType === 'reels',
    delete_messages: deleteType === 'messages',
    max_items: maxItems || null,
  };
  
  const response = await fetch(`${API_URL}/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  });
  return response.json();
};

export const getStats = async () => {
  const response = await fetch(`${API_URL}/stats`);
  return response.json();
};

export const cancelDeletion = async () => {
  const response = await fetch(`${API_URL}/cancel`, { method: 'POST' });
  return response.json();
};

export const logout = async () => {
  const response = await fetch(`${API_URL}/logout`, { method: 'POST' });
  return response.json();
};