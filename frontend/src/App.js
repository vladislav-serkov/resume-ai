import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Upload, FileText, History, BarChart3, Bot, Download, Sparkles, Briefcase, User, Search, Eye, MessageSquare, Zap } from "lucide-react";
import ResumeViewer from "./components/ResumeViewer";
import VacancyAnalyzer from "./components/VacancyAnalyzer";

// Main Dashboard Component
const Dashboard = () => {
  const [resumeData, setResumeData] = useState(null);
  const [vacancyText, setVacancyText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [adaptedResume, setAdaptedResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [showResumeViewer, setShowResumeViewer] = useState(false);
  const [vacancyAnalysis, setVacancyAnalysis] = useState(null);
  const [activeTab, setActiveTab] = useState("upload");

  // Simulate PDF upload and processing
  const handleResumeUpload = async (file) => {
    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      const mockResumeData = {
        name: "Иван Петров",
        position: "Senior Frontend Developer",
        experience: [
          {
            company: "Tech Solutions",
            role: "Frontend Developer",
            period: "2021-2024",
            description: "Разработка современных веб-приложений на React, TypeScript, Next.js"
          },
          {
            company: "StartupXYZ",
            role: "Junior Developer",
            period: "2019-2021",
            description: "Создание интерактивных пользовательских интерфейсов"
          }
        ],
        skills: ["React", "TypeScript", "Next.js", "Node.js", "MongoDB", "AWS"],
        education: "МГУ, Факультет вычислительной математики и кибернетики"
      };
      
      setResumeData(mockResumeData);
      setIsProcessing(false);
    }, 2000);
  };

  // Simulate resume adaptation for vacancy
  const handleVacancyProcess = async () => {
    if (!resumeData || !vacancyText) return;
    
    setIsProcessing(true);
    
    setTimeout(() => {
      const mockAdaptedResume = {
        ...resumeData,
        adaptedFor: vacancyText.substring(0, 100) + "...",
        highlightedSkills: ["React", "TypeScript", "Team Leadership"],
        adaptedExperience: resumeData.experience.map(exp => ({
          ...exp,
          description: exp.description + " с акцентом на командную работу и лидерство"
        }))
      };
      
      const mockCoverLetter = `Уважаемые коллеги!

С большим интересом рассматриваю вакансию в вашей компании. Мой опыт разработки современных веб-приложений и знание актуальных технологий позволят мне эффективно решать поставленные задачи.

Ключевые достижения:
• 5+ лет опыта в Frontend разработке
• Успешная реализация 15+ проектов на React/TypeScript
• Опыт работы в команде и менторство младших разработчиков

Готов обсудить детали и ответить на ваши вопросы.

С уважением,
${resumeData.name}`;

      setAdaptedResume(mockAdaptedResume);
      setCoverLetter(mockCoverLetter);
      setIsProcessing(false);
      setActiveTab("results");
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bot className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Career Boost Bot</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Демо версия</span>
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("upload")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "upload"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Upload className="h-4 w-4 inline-block mr-2" />
                Загрузка резюме
              </button>
              <button
                onClick={() => setActiveTab("vacancy")}
                disabled={!resumeData}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "vacancy" && resumeData
                    ? "border-purple-500 text-purple-600"
                    : "border-transparent text-gray-400 cursor-not-allowed"
                }`}
              >
                <Briefcase className="h-4 w-4 inline-block mr-2" />
                Работа с вакансией
              </button>
              <button
                onClick={() => setActiveTab("results")}
                disabled={!adaptedResume}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "results" && adaptedResume
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-400 cursor-not-allowed"
                }`}
              >
                <Eye className="h-4 w-4 inline-block mr-2" />
                Результаты
              </button>
            </nav>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            
            {/* Upload Tab */}
            {activeTab === "upload" && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <Upload className="h-6 w-6 text-blue-600" />
                    <h2 className="text-xl font-semibold text-gray-900">Загрузка резюме</h2>
                  </div>
                  
                  {!resumeData ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Загрузите ваше резюме</h3>
                      <p className="text-gray-600 mb-4">Поддерживаются форматы PDF</p>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => e.target.files[0] && handleResumeUpload(e.target.files[0])}
                        className="hidden"
                        id="resume-upload"
                      />
                      <label
                        htmlFor="resume-upload"
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                      >
                        Выбрать файл
                      </label>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                            <FileText className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-green-900">{resumeData.name}</h3>
                            <p className="text-sm text-green-700">{resumeData.position}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => setShowResumeViewer(true)}
                            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            <Eye className="h-4 w-4" />
                            <span>Просмотр</span>
                          </button>
                          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                            <Download className="h-4 w-4" />
                            <span>PDF</span>
                          </button>
                        </div>
                      </div>

                      {/* Resume Preview */}
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-3">Извлеченные данные:</h4>
                        <div className="space-y-3 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">Навыки:</span>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {resumeData.skills.map((skill, idx) => (
                                <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Опыт работы:</span>
                            <div className="mt-2 space-y-2">
                              {resumeData.experience.map((exp, idx) => (
                                <div key={idx} className="pl-4 border-l-2 border-gray-200">
                                  <p className="font-medium text-gray-800">{exp.role} - {exp.company}</p>
                                  <p className="text-xs text-gray-600">{exp.period}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="text-center">
                        <button
                          onClick={() => setActiveTab("vacancy")}
                          className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors mx-auto"
                        >
                          <Sparkles className="h-4 w-4" />
                          <span>Перейти к адаптации</span>
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {isProcessing && (
                    <div className="flex items-center justify-center space-x-3 p-6">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      <span className="text-gray-600">Обработка резюме...</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Vacancy Tab */}
            {activeTab === "vacancy" && resumeData && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <Briefcase className="h-6 w-6 text-purple-600" />
                    <h2 className="text-xl font-semibold text-gray-900">Работа с вакансией</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Описание вакансии
                      </label>
                      <textarea
                        value={vacancyText}
                        onChange={(e) => setVacancyText(e.target.value)}
                        placeholder="Вставьте текст вакансии для анализа и адаптации резюме..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                        rows="8"
                      />
                    </div>
                    
                    <div className="flex space-x-3">
                      <button
                        onClick={handleVacancyProcess}
                        disabled={!vacancyText || isProcessing}
                        className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Sparkles className="h-4 w-4" />
                        <span>Адаптировать резюме</span>
                      </button>
                    </div>
                  </div>

                  {isProcessing && (
                    <div className="mt-6 flex items-center justify-center space-x-3 p-6 bg-purple-50 rounded-lg">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                      <span className="text-purple-700">Адаптирую резюме под вакансию...</span>
                    </div>
                  )}
                </div>

                {/* Vacancy Analysis */}
                {vacancyText && (
                  <VacancyAnalyzer 
                    vacancyText={vacancyText} 
                    onAnalysisComplete={setVacancyAnalysis} 
                  />
                )}
              </div>
            )}

            {/* Results Tab */}
            {activeTab === "results" && adaptedResume && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <Zap className="h-6 w-6 text-green-600" />
                      <h2 className="text-xl font-semibold text-gray-900">Результаты адаптации</h2>
                    </div>
                    <div className="flex space-x-3">
                      <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        <Download className="h-4 w-4" />
                        <span>Скачать резюме</span>
                      </button>
                      <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <MessageSquare className="h-4 w-4" />
                        <span>Сопроводительное письмо</span>
                      </button>
                    </div>
                  </div>

                  {/* Success Message */}
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200 mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Sparkles className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-green-900">Резюме успешно адаптировано!</h3>
                        <p className="text-sm text-green-700">Выделены ключевые навыки и опыт для данной вакансии</p>
                      </div>
                    </div>
                  </div>

                  {/* Tabs for Original vs Adapted */}
                  <div className="border-b border-gray-200 mb-6">
                    <nav className="-mb-px flex space-x-8">
                      <button className="py-2 px-1 border-b-2 border-blue-500 font-medium text-sm text-blue-600">
                        Адаптированное резюме
                      </button>
                      <button className="py-2 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700">
                        Сравнить с оригиналом
                      </button>
                    </nav>
                  </div>

                  {/* Resume Preview */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <ResumeViewer resumeData={adaptedResume} isAdapted={true} />
                  </div>
                </div>

                {/* Cover Letter */}
                {coverLetter && (
                  <div className="bg-white rounded-xl shadow-sm border p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <MessageSquare className="h-6 w-6 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Сопроводительное письмо</h3>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">
                        {coverLetter}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Job Search */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Search className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Поиск вакансий</h3>
              </div>
              
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Должность..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Search className="h-4 w-4" />
                  <span>Найти вакансии</span>
                </button>
              </div>

              {/* Mock Search Results */}
              <div className="mt-4 space-y-2">
                <div className="p-3 border border-gray-200 rounded-lg hover:border-green-300 transition-colors cursor-pointer">
                  <h4 className="font-medium text-gray-900 text-sm">Senior Frontend Developer</h4>
                  <p className="text-xs text-gray-600">Яндекс • Москва • до 300к</p>
                </div>
                <div className="p-3 border border-gray-200 rounded-lg hover:border-green-300 transition-colors cursor-pointer">
                  <h4 className="font-medium text-gray-900 text-sm">React Developer</h4>
                  <p className="text-xs text-gray-600">Avito • Москва • до 250к</p>
                </div>
                <div className="p-3 border border-gray-200 rounded-lg hover:border-green-300 transition-colors cursor-pointer">
                  <h4 className="font-medium text-gray-900 text-sm">Fullstack Developer</h4>
                  <p className="text-xs text-gray-600">Сбер • Москва • до 280к</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center space-x-3 mb-4">
                <BarChart3 className="h-5 w-5 text-orange-600" />
                <h3 className="text-lg font-semibold text-gray-900">Статистика</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Обработано резюме:</span>
                  <span className="font-semibold text-gray-900">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Адаптаций:</span>
                  <span className="font-semibold text-gray-900">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Поисков вакансий:</span>
                  <span className="font-semibold text-gray-900">25</span>
                </div>
                <div className="h-px bg-gray-200 my-3"></div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Успешных откликов:</span>
                  <span className="font-semibold text-green-600">3</span>
                </div>
              </div>
            </div>

            {/* History */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center space-x-3 mb-4">
                <History className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">История</h3>
              </div>
              
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-900 text-sm">Frontend Developer - Яндекс</p>
                  <p className="text-xs text-gray-600">2 часа назад</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-900 text-sm">React Developer - Avito</p>
                  <p className="text-xs text-gray-600">1 день назад</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-900 text-sm">Senior Developer - Сбер</p>
                  <p className="text-xs text-gray-600">3 дня назад</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Viewer Modal */}
      {showResumeViewer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Просмотр резюме</h2>
              <button
                onClick={() => setShowResumeViewer(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <ResumeViewer resumeData={showResumeViewer ? resumeData : null} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;