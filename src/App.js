import React, { useState, useEffect, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import LoginSection from './components/LoginSection';
import OperationSection from './components/OperationSection';
import ProgressSection from './components/ProgressSection';
import Header from './components/Header';

// Services
import { startDeletion, getStats, cancelDeletion } from './services/api';
import { 
  handleLogin, 
  handleLogout, 
  isUserLoggedIn, 
  getLoggedInUsername, 
  attachActivityListeners 
} from './services/auth';

// Utils
import { showSuccessModal, showErrorModal } from './utils/modal';

function App() {
  // State declarations
  const [currentSection, setCurrentSection] = useState('login');
  const [loggedInUsername, setLoggedInUsername] = useState('');
  const [deleteStats, setDeleteStats] = useState({
    deleted: 0,
    total: 0,
    inProgress: false,
    elapsedSeconds: 0
  });
  const [statsInterval, setStatsInterval] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Handle session timeout
  const handleSessionTimeout = useCallback(() => {
    setCurrentSection('login');
    showErrorModal('Session Expired', 'Your session has expired due to inactivity. Please log in again to continue.');
  }, []);
  
  // Check login status on mount
  useEffect(() => {
    if (isUserLoggedIn()) {
      const username = getLoggedInUsername();
      setLoggedInUsername(username);
      setCurrentSection('operation');
      
      // Attach activity listeners for session management
      const removeListeners = attachActivityListeners(handleSessionTimeout);
      
      // Clean up
      return () => {
        removeListeners();
      };
    }
  }, [handleSessionTimeout]);
  
  // Function to handle login
  const onLogin = async (username, password) => {
    setIsLoading(true);
    
    try {
      const data = await handleLogin(username, password, handleSessionTimeout);
      
      if (data.success) {
        setLoggedInUsername(username);
        toast.success("Login successful");
        setCurrentSection('operation');
      } else {
        toast.error(`Login failed: ${data.error}`);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Error connecting to server");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to start deletion process
  const startDeletionProcess = async (deleteType, maxItems) => {
    setCurrentSection('progress');
    
    // Reset progress display
    setDeleteStats({
      deleted: 0,
      total: 0,
      inProgress: true,
      elapsedSeconds: 0
    });
    
    try {
      const data = await startDeletion(deleteType, maxItems);
      
      if (data.success) {
        toast.info(`Starting to delete ${deleteType}`);
        
        // Start the stats update interval
        updateStats();
        const interval = setInterval(updateStats, 2000);
        setStatsInterval(interval);
      } else {
        showErrorModal("Failed to Start", data.error || "An error occurred while starting the deletion process");
      }
    } catch (error) {
      console.error("Start deletion error:", error);
      showErrorModal("Connection Error", "Failed to connect to the server. Please check your internet connection and try again.");
    }
  };
  
  // Function to update statistics
  const updateStats = async () => {
    try {
      const data = await getStats();
      
      setDeleteStats({
        deleted: data.deleted,
        total: data.total,
        inProgress: data.in_progress,
        elapsedSeconds: data.elapsed_seconds
      });
      
      // Check if process is complete
      if (!data.in_progress && data.deleted > 0) {
        clearInterval(statsInterval);
        setStatsInterval(null);
        
        if (data.deleted === data.total) {
          completionSuccess(data.deleted);
        } else {
          completionPartial(data.deleted, data.total);
        }
      }
    } catch (error) {
      // Just log the error and continue trying
      console.error("Error fetching stats:", error);
    }
  };
  
  // Function to cancel deletion
  const cancelDeletionProcess = async () => {
    setIsLoading(true);
    
    try {
      await cancelDeletion();
      
      clearInterval(statsInterval);
      setStatsInterval(null);
      
      setDeleteStats(prev => ({
        ...prev,
        inProgress: false
      }));
      
      toast.warning("Deletion process cancelled");
      setIsLoading(false);
    } catch (error) {
      console.error("Cancel deletion error:", error);
      toast.error("Failed to cancel deletion process");
      setIsLoading(false);
    }
  };
  
  // Function to handle successful completion
  const completionSuccess = (deleted) => {
    showSuccessModal(
      "Deletion Complete!",
      `Successfully deleted ${deleted} item${deleted !== 1 ? "s" : ""}.`
    ).then(() => {
      setCurrentSection('operation');
    });
  };
  
  // Function to handle partial completion
  const completionPartial = (deleted, total) => {
    showErrorModal(
      "Process Incomplete",
      `Deleted ${deleted} of ${total} item${total !== 1 ? "s" : ""}. Some items could not be deleted.`
    ).then(() => {
      setCurrentSection('operation');
    });
  };
  
  // Function to handle logout
  const onLogout = async () => {
    setIsLoading(true);
    
    try {
      const data = await handleLogout();
      
      if (data.success) {
        toast.success("Successfully logged out");
        setCurrentSection('login');
        setLoggedInUsername('');
      } else {
        toast.error(data.error || "Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Error connecting to server during logout");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Clean up interval on component unmount
  useEffect(() => {
    return () => {
      if (statsInterval) {
        clearInterval(statsInterval);
      }
    };
  }, [statsInterval]);
  
  // Return to dashboard from progress page if operation is no longer in progress
  const returnToDashboard = () => {
    setCurrentSection('operation');
  };
  
  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 min-h-screen flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-[95%] sm:max-w-md md:max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <Header />
        
        <div className="p-4 sm:p-8 space-y-6">
          {currentSection === 'login' && (
            <LoginSection 
              onLogin={onLogin} 
              isLoading={isLoading}
            />
          )}
          
          {currentSection === 'operation' && (
            <OperationSection 
              username={loggedInUsername}
              onStartDeletion={startDeletionProcess}
              onLogout={onLogout}
              isLoading={isLoading}
            />
          )}
          
          {currentSection === 'progress' && (
            <ProgressSection 
              stats={deleteStats} 
              onCancel={cancelDeletionProcess}
              onReturn={returnToDashboard}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
      <ToastContainer 
        position="top-right" 
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" 
      />
    </div>
  );
}

export default App;