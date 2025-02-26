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
    <div className="space-y-3">
      <div className="flex items-center text-gray-700 mb-2">
        <i className="fas fa-user-lock mr-2"></i>
        <h2 className="font-semibold">Instagram Login</h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            <i className="fas fa-at"></i>
          </span>
          <input 
            type="text" 
            placeholder="Username"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-transparent"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        
        <div className="relative mt-3">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            <i className="fas fa-key"></i>
          </span>
          <input 
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-transparent"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button 
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
          >
            <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
          </button>
        </div>
        
        <button 
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-brand-purple to-brand-pink text-white font-medium rounded-lg flex items-center justify-center mt-3"
          disabled={isLoggingIn}
        >
          {isLoggingIn ? (
            <>
              <i className="fas fa-circle-notch fa-spin mr-2"></i>
              <span>Logging in...</span>
            </>
          ) : (
            <>
              <i className="fas fa-sign-in-alt mr-2"></i>
              <span>Login to Instagram</span>
            </>
          )}
        </button>
      </form>
      
      <p className="text-xs text-gray-500 text-center mt-2">
        Your credentials are sent directly to Instagram and are not stored.
      </p>
    </div>
  );
};

export default LoginSection;