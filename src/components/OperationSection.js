import React, { useState } from 'react';
import Button from './common/Button';
import Input from './common/Input';
import { showConfirmModal, showDeleteConfirmModal } from '../utils/modal';

const OperationSection = ({ username, onStartDeletion, onLogout }) => {
  const [deleteType, setDeleteType] = useState('posts');
  const [maxItems, setMaxItems] = useState('');

  const handleStartDeletion = () => {
    const maxItemsNum = maxItems ? parseInt(maxItems) : null;
    
    // Show confirmation dialog
    showDeleteConfirmModal(
      deleteType,
      maxItemsNum ? `Maximum: ${maxItemsNum} items` : '',
      () => onStartDeletion(deleteType, maxItemsNum)
    );
  };

  const handleLogout = () => {
    showConfirmModal(
      "Logout?",
      "Are you sure you want to logout?",
      onLogout
    );
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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
        <Input 
          type="number" 
          min="1" 
          placeholder="Leave empty to delete all items"
          value={maxItems}
          onChange={(e) => setMaxItems(e.target.value)}
        />
      </div>

      <Button 
        variant="danger"
        onClick={handleStartDeletion}
      >
        <i className="fas fa-trash-alt mr-2"></i>
        <span>Start Cleanup Process</span>
      </Button>

      <Button 
        variant="secondary"
        onClick={handleLogout}
      >
        <i className="fas fa-sign-out-alt mr-2"></i>
        <span>Logout</span>
      </Button>
    </div>
  );
};

export default OperationSection;