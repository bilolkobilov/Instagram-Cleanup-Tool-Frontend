// src/components/common/Input.js
import React from 'react';

const Input = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  icon,
  name,
  id,
  required = false,
  className = '',
  autoComplete = 'off',
  minLength,
  maxLength,
  pattern,
  rightIcon,
  rightIconAction,
  disabled = false
}) => {
  return (
    <div className="relative">
      {icon && (
        <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
          <i className={`fas ${icon}`}></i>
        </span>
      )}
      
      <input
        type={type}
        name={name}
        id={id || name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full ${icon ? 'pl-12' : 'pl-4'} ${rightIcon ? 'pr-12' : 'pr-4'} py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-gray-50 text-gray-800 ${className}`}
        autoComplete={autoComplete}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        disabled={disabled}
      />
      
      {rightIcon && (
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-purple-500 transition-colors focus:outline-none"
          onClick={rightIconAction}
        >
          <i className={`fas ${rightIcon}`}></i>
        </button>
      )}
    </div>
  );
};

export default Input;