import React, { useState } from 'react';
import Input from './common/Input';
import Button from './common/Button';

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
        <Input
          type="text"
          placeholder="Instagram username"
          icon="fa-at"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          name="username"
          required
          autoComplete="username"
        />
        
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          icon="fa-key"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          rightIcon={showPassword ? 'fa-eye-slash' : 'fa-eye'}
          rightIconAction={() => setShowPassword(!showPassword)}
          name="password"
          required
          autoComplete="current-password"
        />
        
        <Button 
          type="submit"
          variant="primary"
          isLoading={isLoggingIn}
          disabled={!username || !password}
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
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          Your credentials are sent directly to Instagram and are not stored on our servers.
          We use secure, encrypted connections to protect your data.
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