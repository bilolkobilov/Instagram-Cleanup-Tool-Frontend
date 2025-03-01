import React from 'react';

const Header = () => {
  return (
    <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 p-4 sm:p-8 text-white">
      <div className="flex items-center justify-center space-x-3">
        <div className="bg-white p-2 sm:p-3 rounded-full shadow-lg flex items-center justify-center">
          <i className="fab fa-instagram text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500" style={{ lineHeight: '1' }}></i>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Instagram Cleanup</h1>
      </div>
      <p className="text-center mt-2 sm:mt-3 text-white/90 text-xs sm:text-sm font-medium">
        Safely remove content from your Instagram account
      </p>
      <div className="text-center mt-1 sm:mt-2">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-green-400" fill="currentColor" viewBox="0 0 8 8">
            <circle cx="4" cy="4" r="3" />
          </svg>
          Secure Connection
        </span>
      </div>
    </div>
  );
};

export default Header;