import React, { useState } from 'react';
import Swal from 'sweetalert2';

const OperationSection = ({ username, onStartDeletion, onLogout }) => {
  const [deleteType, setDeleteType] = useState('posts');
  const [maxItems, setMaxItems] = useState('');

  const handleStartDeletion = () => {
    const maxItemsNum = maxItems ? parseInt(maxItems) : null;
    
    // Show confirmation dialog
    Swal.fire({
      title: "Confirm Deletion",
      html: `
        <div class="text-left">
          <p>You're about to delete all your Instagram ${deleteType}.</p>
          <p class="text-red-500 font-bold mt-2">This action cannot be undone!</p>
          ${maxItemsNum ? `<p class="mt-2">Maximum: ${maxItemsNum} items</p>` : ""}
        </div>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete them!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        onStartDeletion(deleteType, maxItemsNum);
      }
    });
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        onLogout();
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center text-gray-700">
          <i className="fas fa-sliders-h mr-2"></i>
          <h2 className="font-semibold">Deletion Options</h2>
        </div>
        <span className="text-sm text-gray-500">@{username}</span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="relative">
          <input 
            type="radio" 
            id="delete-posts" 
            name="delete-type" 
            value="posts" 
            className="peer hidden"
            checked={deleteType === 'posts'}
            onChange={() => setDeleteType('posts')}
          />
          <label 
            htmlFor="delete-posts"
            className="block p-4 text-center border-2 rounded-lg cursor-pointer transition-all peer-checked:border-brand-purple peer-checked:bg-brand-purple/10"
          >
            <i className="fas fa-images text-xl mb-2"></i>
            <div>Posts</div>
          </label>
        </div>
        
        {/* Similar radio buttons for 'reels' and 'messages' */}
        {/* ... */}
      </div>

      <div>
        <label className="text-sm text-gray-600 block mb-1">
          Maximum items to delete (optional)
        </label>
        <input 
          type="number" 
          min="1" 
          placeholder="Leave empty for all"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-transparent"
          value={maxItems}
          onChange={(e) => setMaxItems(e.target.value)}
        />
      </div>

      <button 
        className="w-full py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-lg flex items-center justify-center"
        onClick={handleStartDeletion}
      >
        <i className="fas fa-trash-alt mr-2"></i>
        <span>Start Deletion Process</span>
      </button>

      <button 
        className="w-full py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-medium rounded-lg flex items-center justify-center mt-2"
        onClick={handleLogout}
      >
        <i className="fas fa-sign-out-alt mr-2"></i>
        <span>Logout</span>
      </button>
    </div>
  );
};

export default OperationSection;