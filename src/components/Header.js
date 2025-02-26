import React from 'react';

const Header = () => {
  return (
    <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 p-8 text-white">
      <div className="flex items-center justify-center space-x-3">
        <div className="bg-white p-3 rounded-full shadow-lg">
          <i className="fab fa-instagram text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500"></i>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Instagram Cleanup</h1>
      </div>
      <p className="text-center mt-3 text-white/90 text-sm font-medium">
        Safely remove content from your Instagram account
      </p>
    </div>
  );
};

export default Header;