// src/services/api.js
const API_URL = process.env.REACT_APP_API_URL || 'https://instagram-cleanup-tool-api.vercel.app';

// Default fetch options to include credentials and secure headers
const getDefaultOptions = (method = 'GET', body = null) => {
  const options = {
    method,
    credentials: 'include', // Always include credentials
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest', // CSRF protection
    },
  };

  // Add SameSite and Secure attributes for cookies
  document.cookie = "SameSite=Strict; Secure";
  
  if (body) {
    options.body = JSON.stringify(body);
  }
  
  return options;
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  // Check for successful response
  if (response.ok) {
    return response.json();
  }
  
  // Handle different error status codes
  if (response.status === 401) {
    // Unauthorized - redirect to login
    window.location.href = '/';
    return { success: false, error: 'Session expired. Please login again.' };
  }
  
  if (response.status === 403) {
    return { success: false, error: 'You do not have permission to perform this action.' };
  }
  
  if (response.status === 429) {
    return { success: false, error: 'Too many requests. Please try again later.' };
  }
  
  // Try to parse error from response
  try {
    const errorData = await response.json();
    return { success: false, error: errorData.error || 'Unknown error occurred' };
  } catch (e) {
    return { success: false, error: `Server error: ${response.status}` };
  }
};

// Check login status on page load
export const checkLoginStatus = async () => {
  try {
    const response = await fetch(`${API_URL}/api/status`, getDefaultOptions());
    return handleResponse(response);
  } catch (error) {
    console.error('Error checking login status:', error);
    return { success: false, loggedIn: false, error: 'Network error' };
  }
};

// Login function
export const login = async (username, password) => {
  if (!username || !password) {
    return { success: false, error: 'Please enter both username and password' };
  }

  try {
    // Sanitize inputs
    const sanitizedUsername = username.trim();
    
    const response = await fetch(
      `${API_URL}/api/login`, 
      getDefaultOptions('POST', { username: sanitizedUsername, password })
    );
    
    return handleResponse(response);
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

    const response = await fetch(
      `${API_URL}/api/delete`, 
      getDefaultOptions('POST', requestData)
    );

    return handleResponse(response);
  } catch (error) {
    console.error('Deletion error:', error);
    return { success: false, error: 'Error connecting to server' };
  }
};

// Cancel deletion process
export const cancelDeletion = async () => {
  try {
    const response = await fetch(
      `${API_URL}/api/cancel`, 
      getDefaultOptions('POST')
    );

    return handleResponse(response);
  } catch (error) {
    console.error('Cancel error:', error);
    return { success: false, error: 'Error cancelling deletion' };
  }
};

// Logout user
export const logout = async () => {
  try {
    const response = await fetch(
      `${API_URL}/api/logout`, 
      getDefaultOptions('POST')
    );

    const result = await handleResponse(response);
    
    // Clear any client-side data
    sessionStorage.clear();
    
    return result;
  } catch (error) {
    console.error('Logout error:', error);
    return { success: false, error: 'Error connecting to server' };
  }
};

// Get progress stats
export const getStats = async () => {
  try {
    const response = await fetch(
      `${API_URL}/api/stats`, 
      getDefaultOptions()
    );

    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return { 
      success: false, 
      error: 'Error retrieving stats',
      deleted: 0,
      total: 0,
      in_progress: false,
      elapsed_seconds: 0
    };
  }
};