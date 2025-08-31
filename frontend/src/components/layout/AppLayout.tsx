import React from 'react';
import { useLocation } from 'react-router-dom';
import { useOnboarding } from '../../hooks/useOnboarding';
import { useAuth } from '../../hooks/useAuth';
import ResumeSelectionModal from '../onboarding/ResumeSelectionModal';

interface Resume {
  id: string;
  title: string;
  url?: string;
  source: 'HH_RU' | 'PLATFORM';
  isActive?: boolean;
}

interface AppLayoutProps {
  children: React.ReactNode;
}

/**
 * Основная обертка приложения, которая управляет показом онбординга
 * Показывает модальное окно выбора резюме поверх основного интерфейса
 * ТОЛЬКО для защищенных роутов (/app/*)
 */
const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const { isOnboardingRequired, completeOnboarding } = useOnboarding();
  const location = useLocation();
  
  // Показывать модал только для защищенных роутов /app/*
  const isProtectedRoute = location.pathname.startsWith('/app/');

  /**
   * Обработчик выбора резюме
   * После выбора резюме закрываем модальное окно
   */
  const handleResumeSelect = async (resume: Resume) => {
    try {
      // TODO: Здесь можно отправить выбранное резюме на сервер для сохранения
      console.log('Selected resume:', resume);
      
      // Завершаем онбординг
      completeOnboarding();
    } catch (error) {
      console.error('Error saving resume:', error);
      // TODO: Показать уведомление об ошибке
    }
  };

  /**
   * Обработчик ошибок
   */
  const handleError = (error: string) => {
    console.error('Onboarding error:', error);
    // TODO: Показать toast уведомление
  };

  return (
    <>
      {/* Основное приложение */}
      {children}
      
      {/* Модальное окно онбординга (показывается только в защищенных роутах авторизованным пользователям, которым требуется онбординг) */}
      {user && isOnboardingRequired && isProtectedRoute && (
        <ResumeSelectionModal
          isOpen={true}
          onResumeSelect={handleResumeSelect}
          onError={handleError}
        />
      )}
    </>
  );
};

export default AppLayout;