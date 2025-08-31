import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Separator } from '../ui/separator';
import { Alert, AlertDescription } from '../ui/alert';
import { Loader2, FileText, Plus, ExternalLink } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8080';

interface Resume {
  id: string;
  title: string;
  url?: string;
  source: 'HH_RU' | 'PLATFORM';
  isActive?: boolean;
}

interface ResumeSelectionProps {
  onResumeSelect: (resume: Resume) => void;
  onError?: (error: string) => void;
}

/**
 * Компонент для выбора резюме при первом входе пользователя
 * Позволяет выбрать существующее резюме с hh.ru или создать новое на платформе
 */
const ResumeSelection: React.FC<ResumeSelectionProps> = ({
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
    fetchHHResumes();
  }, []);

  /**
   * Загружаем резюме пользователя с hh.ru
   */
  const fetchHHResumes = async () => {
    try {
      setIsLoadingResumes(true);
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
  const handleResumeSelect = () => {
    const selectedResume = hhResumes.find(resume => resume.id === selectedResumeId);
    if (selectedResume) {
      onResumeSelect(selectedResume);
    }
  };

  /**
   * Обработчик создания нового резюме на платформе
   */
  const handleCreateNewResume = () => {
    if (newResumeTitle.trim()) {
      const newResume: Resume = {
        id: `platform_${Date.now()}`,
        title: newResumeTitle.trim(),
        source: 'PLATFORM',
        isActive: true,
      };
      onResumeSelect(newResume);
    }
  };

  if (isLoadingResumes) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Загружаем ваши резюме с hh.ru...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Выберите резюме для поиска работы
        </CardTitle>
        <CardDescription className="text-center text-gray-600">
          Выберите одно из ваших резюме с hh.ru или создайте новое на нашей платформе
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Резюме с hh.ru */}
        {hhResumes.length > 0 && (
          <div>
            <Label className="text-base font-semibold mb-4 block">
              Ваши резюме с hh.ru
            </Label>
            <RadioGroup 
              value={selectedResumeId} 
              onValueChange={setSelectedResumeId}
              className="space-y-3"
            >
              {hhResumes.map((resume) => (
                <div key={resume.id} className="flex items-center space-x-3">
                  <RadioGroupItem value={resume.id} id={resume.id} />
                  <div className="flex-1 flex items-center space-x-3">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <Label 
                      htmlFor={resume.id} 
                      className="flex-1 cursor-pointer text-sm"
                    >
                      {resume.title}
                    </Label>
                    {resume.url && (
                      <a
                        href={resume.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </RadioGroup>
            
            <Button 
              onClick={handleResumeSelect}
              disabled={!selectedResumeId}
              className="w-full mt-4"
            >
              Использовать выбранное резюме
            </Button>
          </div>
        )}

        {/* Разделитель */}
        {hhResumes.length > 0 && (
          <div className="flex items-center space-x-4">
            <Separator className="flex-1" />
            <span className="text-sm text-gray-500">или</span>
            <Separator className="flex-1" />
          </div>
        )}

        {/* Создание нового резюме */}
        <div>
          <Label className="text-base font-semibold mb-4 block">
            Создать новое резюме
          </Label>
          <div className="space-y-4">
            <div>
              <Label htmlFor="newResumeTitle" className="text-sm">
                Название резюме
              </Label>
              <Input
                id="newResumeTitle"
                placeholder="Например: Frontend разработчик"
                value={newResumeTitle}
                onChange={(e) => setNewResumeTitle(e.target.value)}
                disabled={isCreatingNew}
                className="mt-1"
              />
            </div>
            
            <Button
              onClick={handleCreateNewResume}
              disabled={!newResumeTitle.trim() || isCreatingNew}
              variant="outline"
              className="w-full"
            >
              {isCreatingNew ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Создание резюме...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Создать новое резюме
                </>
              )}
            </Button>
          </div>
        </div>

        {hhResumes.length === 0 && !error && (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">
              У вас пока нет резюме на hh.ru
            </p>
            <p className="text-sm text-gray-500">
              Создайте новое резюме на нашей платформе или добавьте резюме на hh.ru
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResumeSelection;