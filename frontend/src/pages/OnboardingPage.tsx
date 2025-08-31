import React from 'react';
import { useNavigate } from 'react-router-dom';
import ResumeSelection from '../components/onboarding/ResumeSelection';
import { useAuth } from '../hooks/useAuth';

interface Resume {
  id: string;
  title: string;
  url?: string;
  source: 'HH_RU' | 'PLATFORM';
  isActive?: boolean;
}

/**
 * Страница онбординга для новых пользователей
 * Показывает форму выбора резюме при первом входе
 */
const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  /**
   * Обработчик выбора резюме
   * После выбора резюме переходим в основное приложение
   */
  const handleResumeSelect = async (resume: Resume) => {
    try {
      // TODO: Отправить выбранное резюме на сервер для сохранения
      console.log('Selected resume:', resume);
      
      // Переходим в основное приложение
      navigate('/app/response');
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Добро пожаловать в Smart Career!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {user?.name && `Привет, ${user.name}! `}
            Давайте настроим ваш автоматический поиск работы. 
            Сначала нужно выбрать резюме, которое будет использоваться для откликов.
          </p>
        </div>

        {/* Форма выбора резюме */}
        <ResumeSelection
          onResumeSelect={handleResumeSelect}
          onError={handleError}
        />

        {/* Дополнительная информация */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            После выбора резюме вы сможете настроить параметры автопоиска вакансий
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;