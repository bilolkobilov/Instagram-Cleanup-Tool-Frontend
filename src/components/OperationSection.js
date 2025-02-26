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
      customClass: {
        confirmButton: 'swal-confirm-button',
        cancelButton: 'swal-cancel-button',
        popup: 'swal-popup'
      },
      buttonsStyling: false
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
      customClass: {
        confirmButton: 'swal-confirm-button',
        cancelButton: 'swal-cancel-button',
        popup: 'swal-popup'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        onLogout();
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center text-gray-800">
          <i className="fas fa-sliders-h text-purple-500 mr-2"></i>
          <h2 className="text-xl font-semibold">Cleanup Options</h2>
        </div>
        <div className="flex items-center space-x-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
          <i className="fas fa-user text-sm"></i>
          <span className="text-sm font-medium">@{username}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
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
            className="flex flex-col items-center justify-center p-4 text-center border-2 border-gray-200 rounded-xl cursor-pointer transition-all peer-checked:border-purple-500 peer-checked:bg-purple-50 hover:bg-gray-50 h-full"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
              <i className="fas fa-images text-purple-500"></i>
            </div>
            <div className="font-medium">Posts</div>
          </label>
        </div>

        <div className="relative">
          <input 
            type="radio" 
            id="delete-reels" 
            name="delete-type" 
            value="reels" 
            className="peer hidden"
            checked={deleteType === 'reels'}
            onChange={() => setDeleteType('reels')}
          />
          <label 
            htmlFor="delete-reels"
            className="flex flex-col items-center justify-center p-4 text-center border-2 border-gray-200 rounded-xl cursor-pointer transition-all peer-checked:border-purple-500 peer-checked:bg-purple-50 hover:bg-gray-50 h-full"
          >
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-2">
              <i className="fas fa-video text-pink-500"></i>
            </div>
            <div className="font-medium">Reels</div>
          </label>
        </div>

        <div className="relative">
          <input 
            type="radio" 
            id="delete-messages" 
            name="delete-type" 
            value="messages" 
            className="peer hidden"
            checked={deleteType === 'messages'}
            onChange={() => setDeleteType('messages')}
          />
          <label 
            htmlFor="delete-messages"
            className="flex flex-col items-center justify-center p-4 text-center border-2 border-gray-200 rounded-xl cursor-pointer transition-all peer-checked:border-purple-500 peer-checked:bg-purple-50 hover:bg-gray-50 h-full"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <i className="fas fa-comment-dots text-blue-500"></i>
            </div>
            <div className="font-medium">Messages</div>
          </label>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-xl">
        <label className="text-sm text-gray-700 block mb-2 font-medium flex items-center">
          <i className="fas fa-hashtag text-purple-500 mr-2"></i>
          Maximum items to delete (optional)
        </label>
        <input 
          type="number" 
          min="1" 
          placeholder="Leave empty to delete all items"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
          value={maxItems}
          onChange={(e) => setMaxItems(e.target.value)}
        />
      </div>

      <button 
        className="w-full py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium rounded-xl flex items-center justify-center shadow-md hover:shadow-lg transition-transform hover:translate-y-[-2px]"
        onClick={handleStartDeletion}
      >
        <i className="fas fa-trash-alt mr-2"></i>
        <span>Start Cleanup Process</span>
      </button>

      <button 
        className="w-full py-3 bg-gray-100 text-gray-700 font-medium rounded-xl flex items-center justify-center transition-colors hover:bg-gray-200"
        onClick={handleLogout}
      >
        <i className="fas fa-sign-out-alt mr-2"></i>
        <span>Logout</span>
      </button>
    </div>
  );
};

export default OperationSection;