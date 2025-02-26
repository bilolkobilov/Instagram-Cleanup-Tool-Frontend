import React from 'react';

const Header = () => {
  return (
    <div className="bg-gradient-to-r from-brand-purple via-brand-pink to-brand-orange p-6 text-white">
      <div className="flex items-center justify-center space-x-3">
        <i className="fab fa-instagram text-3xl"></i>
        <h1 className="text-2xl font-bold">Instagram Cleanup Tool</h1>
      </div>
      <p className="text-center mt-2 text-white/80 text-sm">
        Safely remove posts, reels, and messages from your account
      </p>
    </div>
  );
};

export default Header;