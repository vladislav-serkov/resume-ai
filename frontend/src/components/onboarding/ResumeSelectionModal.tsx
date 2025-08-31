import React, { useState, useEffect } from 'react';
import { FileText, Plus, ExternalLink, Target, Sparkles } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8080';

interface Resume {
  id: string;
  title: string;
  url?: string;
  source: 'HH_RU' | 'PLATFORM';
  isActive?: boolean;
}

interface ResumeSelectionModalProps {
  isOpen: boolean;
  onResumeSelect: (resume: Resume) => void;
  onError?: (error: string) => void;
}

/**
 * Модальное окно для выбора резюме при первом входе пользователя
 * Показывается поверх основного интерфейса с приглушенным фоном
 */
const ResumeSelectionModal: React.FC<ResumeSelectionModalProps> = ({
  isOpen,
  onResumeSelect,
  onError,
}) => {
  const [hhResumes, setHhResumes] = useState<Resume[]>([]);
  const [selectedResumeId, setSelectedResumeId] = useState<string>('');
  const [isLoadingResumes, setIsLoadingResumes] = useState(true);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newResumeTitle, setNewResumeTitle] = useState('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      fetchHHResumes();
    }
  }, [isOpen]);

  /**
   * Загружаем резюме пользователя с hh.ru
   */
  const fetchHHResumes = async () => {
    try {
      setIsLoadingResumes(true);
      setError('');
      const response = await fetch(`${API_BASE_URL}/api/resumes/hh`, {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Не удалось загрузить резюме с hh.ru');
      }

      const resumes: Resume[] = await response.json();
      setHhResumes(resumes);
      
      // Автоматически выбираем первое резюме, если оно есть
      if (resumes.length > 0) {
        setSelectedResumeId(resumes[0].id);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка загрузки резюме';
      setError(errorMessage);
      if (onError) onError(errorMessage);
    } finally {
      setIsLoadingResumes(false);
    }
  };

  /**
   * Обработчик выбора резюме
   */
  const handleResumeSelect = async () => {
    const selectedResume = hhResumes.find(resume => resume.id === selectedResumeId);
    if (!selectedResume) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/onboarding/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          selectedResumeId: selectedResume.id,
          resumeTitle: selectedResume.title,
          resumeSource: selectedResume.source
        }),
      });

      if (!response.ok) {
        throw new Error('Не удалось завершить онбординг');
      }

      // После успешного завершения онбординга вызываем callback
      onResumeSelect(selectedResume);
    } catch (error) {
      console.error('Error completing onboarding:', error);
      if (onError) {
        onError(error instanceof Error ? error.message : 'Ошибка завершения онбординга');
      }
    }
  };

  /**
   * Обработчик создания нового резюме на платформе
   */
  const handleCreateNewResume = async () => {
    if (!newResumeTitle.trim()) return;

    setIsCreatingNew(true);
    try {
      const newResumeId = `platform_${Date.now()}`;
      
      const response = await fetch(`${API_BASE_URL}/api/onboarding/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          selectedResumeId: newResumeId,
          resumeTitle: newResumeTitle.trim(),
          resumeSource: 'PLATFORM'
        }),
      });

      if (!response.ok) {
        throw new Error('Не удалось создать резюме');
      }

      // После успешного создания вызываем callback
      const newResume: Resume = {
        id: newResumeId,
        title: newResumeTitle.trim(),
        source: 'PLATFORM',
        isActive: true,
      };
      onResumeSelect(newResume);
    } catch (error) {
      console.error('Error creating new resume:', error);
      if (onError) {
        onError(error instanceof Error ? error.message : 'Ошибка создания резюме');
      }
    } finally {
      setIsCreatingNew(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-6 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl min-h-[500px] max-h-[90vh] overflow-y-auto animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        {/* Заголовок с градиентом */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-t-3xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-3xl mb-6">
              <FileText className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-bold mb-3">
              Добро пожаловать в Smart Career!
            </h2>
            <p className="text-blue-100 text-lg leading-relaxed">
              Для начала работы выберите одно из ваших резюме с hh.ru или создайте новое на нашей платформе
            </p>
          </div>
        </div>

        <div className="p-6 min-h-[280px]">
          {isLoadingResumes ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Загружаем ваши резюме с hh.ru...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              )}

              {/* Резюме с hh.ru */}
              {hhResumes.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    <span>Ваши резюме с hh.ru</span>
                  </h3>
                  <div className="space-y-3">
                    {hhResumes.map((resume) => (
                      <label
                        key={resume.id}
                        className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-blue-300 hover:bg-blue-50 ${
                          selectedResumeId === resume.id 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="resume"
                          value={resume.id}
                          checked={selectedResumeId === resume.id}
                          onChange={() => setSelectedResumeId(resume.id)}
                          className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <div className="ml-4 flex-1">
                          <div className="flex items-center space-x-3">
                            <FileText className="w-5 h-5 text-blue-600" />
                            <span className="font-medium text-gray-900">{resume.title}</span>
                            {resume.url && (
                              <a
                                href={resume.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 p-1"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                  
                  <button
                    onClick={handleResumeSelect}
                    disabled={!selectedResumeId}
                    className={`w-full mt-4 px-6 py-3 rounded-xl font-semibold transition-all ${
                      selectedResumeId
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Использовать выбранное резюме
                  </button>
                </div>
              )}

              {/* Разделитель */}
              {hhResumes.length > 0 && (
                <div className="flex items-center space-x-4">
                  <div className="flex-1 h-px bg-gray-200"></div>
                  <span className="text-sm text-gray-500 bg-white px-3">или</span>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>
              )}

              {/* Создание нового резюме */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <span>Создать новое резюме</span>
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Название резюме
                    </label>
                    <input
                      type="text"
                      placeholder="Например: Frontend разработчик"
                      value={newResumeTitle}
                      onChange={(e) => setNewResumeTitle(e.target.value)}
                      disabled={isCreatingNew}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <button
                    onClick={handleCreateNewResume}
                    disabled={!newResumeTitle.trim() || isCreatingNew}
                    className={`w-full px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center space-x-2 ${
                      newResumeTitle.trim() && !isCreatingNew
                        ? 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
                        : 'border-2 border-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {isCreatingNew ? (
                      <>
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                        <span>Создание резюме...</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Создать новое резюме</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {hhResumes.length === 0 && !error && (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-2xl mb-4">
                    <FileText className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Резюме не найдены
                  </h3>
                  <p className="text-gray-600 mb-1">
                    У вас пока нет резюме на hh.ru
                  </p>
                  <p className="text-sm text-gray-500">
                    Создайте новое резюме на нашей платформе или добавьте резюме на hh.ru
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeSelectionModal;