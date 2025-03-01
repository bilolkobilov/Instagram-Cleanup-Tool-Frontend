import { login as apiLogin, logout as apiLogout } from './api';

// Session timeout duration in minutes
const SESSION_TIMEOUT = 30;

// Initialize the session timer
let sessionTimer = null;

// Start the session timeout timer
export const startSessionTimer = (onTimeout) => {
  // Clear any existing timer
  if (sessionTimer) {
    clearTimeout(sessionTimer);
  }
  
  // Set a new timer
  sessionTimer = setTimeout(() => {
    // Log out the user when the session expires
    handleLogout().then(() => {
      if (onTimeout) onTimeout();
    });
  }, SESSION_TIMEOUT * 60 * 1000);
};

// Reset the session timer (call this on user activity)
export const resetSessionTimer = (onTimeout) => {
  if (sessionTimer) {
    clearTimeout(sessionTimer);
  }
  startSessionTimer(onTimeout);
};

// Clear the session timer
export const clearSessionTimer = () => {
  if (sessionTimer) {
    clearTimeout(sessionTimer);
    sessionTimer = null;
  }
};

// Enhanced login function with session management
export const handleLogin = async (username, password, onSessionTimeout) => {
  try {
    // Validate input
    if (!username || !password) {
      return { success: false, error: 'Please enter both username and password' };
    }
    
    // Attempt to login
    const result = await apiLogin(username, password);
    
    // If login is successful, start the session timer
    if (result.success) {
      startSessionTimer(onSessionTimeout);
      
      // Store login status in sessionStorage (not localStorage for security)
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('username', username);
    }
    
    return result;
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'Error connecting to server' };
  }
};

// Enhanced logout function
export const handleLogout = async () => {
  try {
    // Clear the session timer
    clearSessionTimer();
    
    // Clear session storage
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('username');
    
    // Call the API logout
    return await apiLogout();
  } catch (error) {
    console.error('Logout error:', error);
    return { success: false, error: 'Error connecting to server during logout' };
  }
};

// Check if user is logged in based on session storage
export const isUserLoggedIn = () => {
  return sessionStorage.getItem('isLoggedIn') === 'true';
};

// Get the username from session storage
export const getLoggedInUsername = () => {
  return sessionStorage.getItem('username') || '';
};

// Attach activity listeners to reset the session timer
export const attachActivityListeners = (onSessionTimeout) => {
  const activityEvents = ['mousedown', 'keypress', 'scroll', 'touchstart'];
  
  const resetTimer = () => {
    resetSessionTimer(onSessionTimeout);
  };
  
  // Add event listeners
  activityEvents.forEach(event => {
    document.addEventListener(event, resetTimer);
  });
  
  // Return a function to remove the listeners
  return () => {
    activityEvents.forEach(event => {
      document.removeEventListener(event, resetTimer);
    });
  };
};