import React from 'react';

const SecurityBanner = () => {
  return (
    <div className="mt-6 text-center">
      <div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
        <i className="fas fa-lock text-green-500"></i>
        <span>Secure HTTPS Connection</span>
      </div>
      <div className="border-t border-gray-200 my-4"></div>
      <p className="text-xs text-gray-500 mb-1">
        Your credentials are sent directly to Instagram and are not stored on our servers.
      </p>
      <div className="flex justify-center space-x-4 mt-2">
        <div className="flex items-center text-xs text-gray-400">
          <i className="fas fa-shield-alt text-green-500 mr-1"></i>
          <span>Encrypted</span>
        </div>
        <div className="flex items-center text-xs text-gray-400">
          <i className="fas fa-user-shield text-green-500 mr-1"></i>
          <span>Private</span>
        </div>
        <div className="flex items-center text-xs text-gray-400">
          <i className="fas fa-cookie-bite text-green-500 mr-1"></i>
          <span>No Tracking</span>
        </div>
      </div>
    </div>
  );
};

export default SecurityBanner;