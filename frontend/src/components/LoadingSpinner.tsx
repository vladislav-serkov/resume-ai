import React from 'react';
import { LoadingSpinnerProps, SpinnerSize } from '../types';
import { SPINNER_SIZE_CLASSES, SPINNER_TEXT_SIZE_CLASSES } from '../constants';

/**
 * Loading spinner component with customizable size and text
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  text = "Загрузка...", 
  size = SpinnerSize.MEDIUM 
}) => {
  const spinnerClasses = SPINNER_SIZE_CLASSES[size];
  const textClasses = SPINNER_TEXT_SIZE_CLASSES[size];

  return (
    <div className="flex items-center justify-center space-x-3 p-6">
      <div 
        className={`animate-spin rounded-full border-b-2 border-blue-600 ${spinnerClasses}`}
        role="status"
        aria-label="Загрузка"
      />
      <span className={`text-gray-600 ${textClasses}`}>
        {text}
      </span>
    </div>
  );
};

export default LoadingSpinner;