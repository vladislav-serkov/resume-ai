import React, { useState, useRef, useEffect } from 'react';
import {
  FileText,
  ChevronDown,
  X,
  Sparkles,
  Upload,
  Download,
  Eye,
  PlusCircle,
  Target
} from 'lucide-react';

interface ResumeMiniProps {
  user: {
    name: string;
    position: string;
    avatar: string;
  };
}

interface Resume {
  id: number;
  name: string;
  isOriginal: boolean;
  uploadDate?: string;
  adaptations?: number;
  lastUsed?: string;
  baseVacancy?: string;
  adaptationDate?: string;
  matchScore?: number;
}

const ResumeMini: React.FC<ResumeMiniProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const mockResumes: Resume[] = [
    {
      id: 1,
      name: 'Основное резюме',
      isOriginal: true,
      uploadDate: '2024-01-10',
      adaptations: 15,
      lastUsed: '2024-01-15'
    },
    {
      id: 2,
      name: 'Для Яндекс',
      isOriginal: false,
      baseVacancy: 'Senior Frontend Developer - Яндекс',
      adaptationDate: '2024-01-15',
      matchScore: 92
    },
    {
      id: 3,
      name: 'Для Avito',
      isOriginal: false,
      baseVacancy: 'React Developer - Avito',
      adaptationDate: '2024-01-14',
      matchScore: 87
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const originalResumes = mockResumes.filter(r => r.isOriginal);
  const adaptedResumes = mockResumes.filter(r => !r.isOriginal);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Mini Resume Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <div className="flex items-center space-x-2">
          <FileText className="h-5 w-5" />
          <div className="text-sm">
            <div className="font-medium">{originalResumes.length} резюме</div>
            <div className="text-xs text-gray-500">{adaptedResumes.length} адаптаций</div>
          </div>
        </div>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Expanded Resume Panel */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-[420px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 max-h-[32rem] overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Резюме</h3>
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-1 px-3 py-1 bg-purple-600 text-white text-xs rounded-lg hover:bg-purple-700 transition-colors">
                  <PlusCircle className="h-3 w-3" />
                  <span>Создать</span>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {/* Quick Stats */}
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-gray-900">{originalResumes.length}</div>
                  <div className="text-xs text-gray-600">Оригиналов</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">{adaptedResumes.length}</div>
                  <div className="text-xs text-gray-600">Адаптаций</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">
                    {originalResumes.reduce((sum, r) => sum + (r.adaptations || 0), 0)}
                  </div>
                  <div className="text-xs text-gray-600">Всего адаптаций</div>
                </div>
              </div>
            </div>

            {/* Resume List */}
            <div className="divide-y divide-gray-100">
              {mockResumes.map((resume) => (
                <div key={resume.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      {/* Icon */}
                      <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                        resume.isOriginal ? 'bg-blue-100' : 'bg-purple-100'
                      }`}>
                        {resume.isOriginal ? (
                          <FileText className="h-4 w-4 text-blue-600" />
                        ) : (
                          <Sparkles className="h-4 w-4 text-purple-600" />
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="text-sm font-medium text-gray-900 truncate">
                            {resume.name}
                          </h4>
                          {resume.isOriginal && (
                            <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                              Оригинал
                            </span>
                          )}
                          {resume.matchScore && (
                            <div className="flex items-center space-x-1">
                              <Target className="h-3 w-3 text-gray-400" />
                              <span className="text-xs text-gray-600">{resume.matchScore}%</span>
                            </div>
                          )}
                        </div>
                        
                        {resume.isOriginal ? (
                          <div className="text-xs text-gray-600">
                            <p>Адаптаций: {resume.adaptations}</p>
                            <p>Последнее: {resume.lastUsed ? new Date(resume.lastUsed).toLocaleDateString('ru-RU') : '-'}</p>
                          </div>
                        ) : (
                          <div className="text-xs text-gray-600">
                            <p className="truncate">{resume.baseVacancy}</p>
                            <p>{resume.adaptationDate ? new Date(resume.adaptationDate).toLocaleDateString('ru-RU') : '-'}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center space-x-1 ml-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600 rounded transition-colors" title="Просмотр">
                        <Eye className="h-3 w-3" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-600 rounded transition-colors" title="Скачать">
                        <Download className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
            <div className="flex space-x-2">
              <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                <Upload className="h-3 w-3" />
                <span>Загрузить</span>
              </button>
              <button className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:border-gray-400 transition-colors">
                Управление
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeMini;