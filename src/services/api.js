// src/services/api.js
const API_URL = process.env.REACT_APP_API_URL || 'https://instagram-cleanup-tool-api.vercel.app';

// Check login status on page load
export const checkLoginStatus = async () => {
  try {
    const response = await fetch(`${API_URL}/api/status`, {
      credentials: 'include', // Keeps session data
    });
    return response.json();
  } catch (error) {
    console.error('Error checking login status:', error);
    return { loggedIn: false };
  }
};

// Login function
export const login = async (username, password) => {
  if (!username || !password) {
    return { success: false, error: 'Please enter both username and password' };
  }

  try {
    const response = await fetch(`${API_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include',
    });

    return response.json();
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'Error connecting to server' };
  }
};

// Start deletion process
export const startDeletion = async (contentType, maxItems) => {
  try {
    const requestData = {
      delete_reels: contentType === 'reels',
      delete_messages: contentType === 'messages',
      delete_posts: contentType === 'posts',
      max_items: maxItems || null,
    };

    const response = await fetch(`${API_URL}/api/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
      credentials: 'include',
    });

    return response.json();
  } catch (error) {
    console.error('Deletion error:', error);
    return { success: false, error: 'Error connecting to server' };
  }
};

// Cancel deletion process
export const cancelDeletion = async () => {
  try {
    const response = await fetch(`${API_URL}/api/cancel`, {
      method: 'POST',
      credentials: 'include',
    });

    return response.json();
  } catch (error) {
    console.error('Cancel error:', error);
    return { success: false, error: 'Error cancelling deletion' };
  }
};

// Logout user
export const logout = async () => {
  try {
    const response = await fetch(`${API_URL}/api/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    return response.json();
  } catch (error) {
    console.error('Logout error:', error);
    return { success: false, error: 'Error connecting to server' };
  }
};

// Get progress stats
export const getStats = async () => {
  try {
    const response = await fetch(`${API_URL}/api/stats`, {
      credentials: 'include',
    });

    return response.json();
  } catch (error) {
    console.error('Error fetching stats:', error);
    return { success: false, error: 'Error retrieving stats' };
  }
};
