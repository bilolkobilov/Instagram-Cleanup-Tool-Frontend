import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

// Components
import LoginSection from './components/LoginSection';
import OperationSection from './components/OperationSection';
import ProgressSection from './components/ProgressSection';
import Header from './components/Header';

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
  
  // Function to handle login
  const handleLogin = async (username, password) => {
    if (!username || !password) {
      toast.warning("Please enter both username and password");
      return;
    }
    
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setLoggedInUsername(username);
        toast.success("Login successful");
        setCurrentSection('operation');
      } else {
        toast.error(`Login failed: ${data.error}`);
      }
    } catch (error) {
      toast.error("Error connecting to server");
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
    
    const requestData = {
      delete_reels: deleteType === 'reels',
      delete_messages: deleteType === 'messages',
      max_items: maxItems || null,
    };
    
    try {
      const response = await fetch('/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.info(`Starting to delete ${deleteType}`);
        
        // Start the stats update interval
        updateStats();
        const interval = setInterval(updateStats, 2000);
        setStatsInterval(interval);
      } else {
        showError("Failed to start deletion process", data.error);
      }
    } catch (error) {
      showError("Failed to start deletion process", "Error connecting to server");
    }
  };
  
  // Function to update statistics
  const updateStats = async () => {
    try {
      const response = await fetch('/stats');
      const data = await response.json();
      
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
          completionSuccess(data.deleted, data.total);
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
  const cancelDeletion = async () => {
    try {
      await fetch('/cancel', { method: 'POST' });
      
      clearInterval(statsInterval);
      setStatsInterval(null);
      
      setDeleteStats(prev => ({
        ...prev,
        inProgress: false
      }));
      
      toast.warning("Deletion process cancelled");
    } catch (error) {
      toast.error("Failed to cancel deletion process");
    }
  };
  
  // Function to handle successful completion
  const completionSuccess = (deleted, total) => {
    Swal.fire({
      title: "Deletion Complete!",
      text: `Successfully deleted ${deleted} item${deleted !== 1 ? "s" : ""}.`,
      icon: "success",
      confirmButtonText: "Back to Dashboard",
      customClass: {
        confirmButton: 'swal-confirm-button',
        popup: 'swal-popup'
      },
      buttonsStyling: false
    }).then(() => {
      setCurrentSection('operation');
    });
  };
  
  // Function to handle partial completion
  const completionPartial = (deleted, total) => {
    Swal.fire({
      title: "Process Stopped",
      text: `Deleted ${deleted} of ${total} item${total !== 1 ? "s" : ""}.`,
      icon: "warning",
      confirmButtonText: "Back to Dashboard",
      customClass: {
        confirmButton: 'swal-confirm-button',
        popup: 'swal-popup'
      },
      buttonsStyling: false
    }).then(() => {
      setCurrentSection('operation');
    });
  };
  
  // Function to show error
  const showError = (title, message) => {
    clearInterval(statsInterval);
    setStatsInterval(null);
    
    Swal.fire({
      title: title,
      text: message,
      icon: "error",
      confirmButtonText: "Back to Dashboard",
      customClass: {
        confirmButton: 'swal-confirm-button',
        popup: 'swal-popup'
      },
      buttonsStyling: false
    }).then(() => {
      setCurrentSection('operation');
    });
  };
  
  // Function to handle logout
  const handleLogout = async () => {
    try {
      const response = await fetch('/logout', { method: 'POST' });
      const data = await response.json();
      
      if (data.success) {
        toast.success("Successfully logged out");
        setCurrentSection('login');
        setLoggedInUsername('');
      } else {
        toast.error(data.error || "Logout failed");
      }
    } catch (error) {
      toast.error("Error connecting to server during logout");
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
  
  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <Header />
        
        <div className="p-8 space-y-6">
          {currentSection === 'login' && (
            <LoginSection onLogin={handleLogin} />
          )}
          
          {currentSection === 'operation' && (
            <OperationSection 
              username={loggedInUsername}
              onStartDeletion={startDeletionProcess}
              onLogout={handleLogout}
            />
          )}
          
          {currentSection === 'progress' && (
            <ProgressSection 
              stats={deleteStats} 
              onCancel={cancelDeletion} 
            />
          )}
        </div>
      </div>
      <ToastContainer position="bottom-center" theme="colored" />
    </div>
  );
}

export default App;