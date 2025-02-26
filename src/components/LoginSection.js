import React, { useState } from 'react';

const LoginSection = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    await onLogin(username, password);
    setIsLoggingIn(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center text-gray-800 mb-4">
        <i className="fas fa-user-lock text-purple-500 mr-2"></i>
        <h2 className="text-xl font-semibold">Sign in with Instagram</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
            <i className="fas fa-at"></i>
          </span>
          <input 
            type="text" 
            placeholder="Instagram username"
            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-gray-50 text-gray-800"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
            <i className="fas fa-key"></i>
          </span>
          <input 
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-gray-50 text-gray-800"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button 
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-purple-500 transition-colors focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
          >
            <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
          </button>
        </div>
        
        <button 
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-xl flex items-center justify-center transition-transform hover:translate-y-[-2px] shadow-md hover:shadow-lg"
          disabled={isLoggingIn}
        >
          {isLoggingIn ? (
            <>
              <i className="fas fa-circle-notch fa-spin mr-2"></i>
              <span>Connecting to Instagram...</span>
            </>
          ) : (
            <>
              <i className="fas fa-sign-in-alt mr-2"></i>
              <span>Connect to Instagram</span>
            </>
          )}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          Your credentials are sent directly to Instagram and are not stored on our servers.
        </p>
        <div className="border-t border-gray-200 my-4"></div>
        <p className="text-xs text-gray-400 flex items-center justify-center">
          <i className="fas fa-shield-alt text-green-500 mr-2"></i>
          Secure &amp; encrypted connection
        </p>
      </div>
    </div>
  );
};

export default LoginSection;