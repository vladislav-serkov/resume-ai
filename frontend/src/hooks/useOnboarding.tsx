import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './useAuth';

const API_BASE_URL = 'http://localhost:8080';

interface OnboardingContextType {
  isOnboardingRequired: boolean;
  isCheckingStatus: boolean;
  checkOnboardingStatus: () => Promise<void>;
  completeOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | null>(null);

/**
 * Провайдер для управления состоянием онбординга
 */
export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOnboardingRequired, setIsOnboardingRequired] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const { user } = useAuth();

  /**
   * Проверяем статус онбординга пользователя
   */
  const checkOnboardingStatus = async () => {
    if (!user) {
      setIsOnboardingRequired(false);
      return;
    }

    try {
      setIsCheckingStatus(true);
      const response = await fetch(`${API_BASE_URL}/api/onboarding/status`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const { onboardingRequired } = await response.json();
        setIsOnboardingRequired(onboardingRequired);
      } else {
        // Если не удалось проверить статус, требуем онбординг
        setIsOnboardingRequired(true);
      }
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      // При ошибке требуем онбординг
      setIsOnboardingRequired(true);
    } finally {
      setIsCheckingStatus(false);
    }
  };

  /**
   * Завершаем онбординг
   */
  const completeOnboarding = () => {
    setIsOnboardingRequired(false);
  };

  // Проверяем статус при изменении пользователя
  useEffect(() => {
    if (user) {
      checkOnboardingStatus();
    } else {
      setIsOnboardingRequired(false);
    }
  }, [user]);

  return (
    <OnboardingContext.Provider value={{
      isOnboardingRequired,
      isCheckingStatus,
      checkOnboardingStatus,
      completeOnboarding,
    }}>
      {children}
    </OnboardingContext.Provider>
  );
};

/**
 * Хук для работы с онбордингом
 */
export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};