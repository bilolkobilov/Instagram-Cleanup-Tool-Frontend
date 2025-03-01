import React from 'react';

const Button = ({ 
  onClick, 
  children, 
  variant = 'primary', 
  isLoading = false,
  fullWidth = true,
  disabled = false,
  type = 'button',
  className = '',
  icon = null
}) => {
  const baseClasses = "py-3 font-medium rounded-xl flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";
  const widthClasses = fullWidth ? "w-full" : "";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md hover:shadow-lg hover:translate-y-[-2px] focus:ring-purple-500",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-400",
    danger: "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md hover:shadow-lg hover:translate-y-[-2px] focus:ring-red-500",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-400",
    success: "bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-md hover:shadow-lg hover:translate-y-[-2px] focus:ring-green-500"
  };
  
  return (
    <button 
      onClick={onClick}
      disabled={disabled || isLoading}
      type={type}
      className={`${baseClasses} ${widthClasses} ${variantClasses[variant]} ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
    >
      {isLoading ? (
        <>
          <i className="fas fa-circle-notch fa-spin mr-2"></i>
          <span>Loading...</span>
        </>
      ) : (
        <>
          {icon && <i className={`fas ${icon} ${children ? 'mr-2' : ''}`}></i>}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;