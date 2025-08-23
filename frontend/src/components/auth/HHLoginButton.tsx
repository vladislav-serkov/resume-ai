import React, { useState } from 'react';
import { authService } from '../../services/authService';

interface HHLoginButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onError?: (error: string) => void;
}

/**
 * HeadHunter branded login button component
 * Follows hh.ru design guidelines with official colors and styling
 */
const HHLoginButton: React.FC<HHLoginButtonProps> = ({
  className = '',
  variant = 'primary',
  size = 'md',
  disabled = false,
  onError,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (disabled || isLoading) return;

    try {
      setIsLoading(true);
      await authService.initiateLogin();
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Ошибка входа';
      if (onError) {
        onError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const variantStyles = {
    primary: 'bg-red-600 hover:bg-red-700 text-white border-transparent',
    secondary: 'bg-white hover:bg-gray-50 text-red-600 border-red-600 border-2'
  };

  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2';

  return (
    <button
      onClick={handleLogin}
      disabled={disabled || isLoading}
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}
        ${className}
      `}
    >
      {isLoading ? (
        <>
          <div className="w-5 h-5 mr-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Подключение...</span>
        </>
      ) : (
        <>
          <div className="w-6 h-6 mr-3 flex items-center justify-center">
            {/* HeadHunter "hh" logo styled icon */}
            <div className="flex items-center justify-center w-6 h-6 bg-current rounded-sm">
              <span className="text-xs font-bold text-red-600 bg-white px-1 rounded-xs">hh</span>
            </div>
          </div>
          <span>Войти через hh.ru</span>
        </>
      )}
    </button>
  );
};

/**
 * Compact version for use in navigation or small spaces
 */
export const HHLoginButtonCompact: React.FC<Omit<HHLoginButtonProps, 'size'>> = (props) => (
  <HHLoginButton {...props} size="sm" />
);

/**
 * Large CTA version for landing pages
 */
export const HHLoginButtonCTA: React.FC<Omit<HHLoginButtonProps, 'size' | 'variant'>> = (props) => (
  <HHLoginButton {...props} size="lg" variant="primary" />
);

export default HHLoginButton;