import React from 'react';

const LoadingSpinner = ({ text = "Загрузка...", size = "md" }) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6", 
    lg: "h-8 w-8"
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  };

  return (
    <div className="flex items-center justify-center space-x-3 p-6">
      <div className={`animate-spin rounded-full border-b-2 border-blue-600 ${sizeClasses[size]}`}></div>
      <span className={`text-gray-600 ${textSizeClasses[size]}`}>{text}</span>
    </div>
  );
};

export default LoadingSpinner;