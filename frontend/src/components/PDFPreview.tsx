import { Download, Eye, Share2, Printer } from 'lucide-react';

interface PDFPreviewProps {
  resumeData?: any;
  isAdapted?: boolean;
}

const PDFPreview: React.FC<PDFPreviewProps> = ({ resumeData, isAdapted = false }) => {
  if (!resumeData) return null;

  const handleDownload = () => {
    // Simulate PDF download
    console.log('Downloading PDF...');
  };

  const handlePreview = () => {
    // Simulate PDF preview
    console.log('Opening PDF preview...');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border overflow-hidden">
      {/* PDF Header */}
      <div className="bg-gray-100 px-6 py-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-8 bg-red-500 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">PDF</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">
                {isAdapted ? 'Адаптированное резюме' : 'Резюме'} - {resumeData.name}
              </h3>
              <p className="text-sm text-gray-600">
                {isAdapted ? 'Создано с учетом требований вакансии' : 'Оригинальное резюме'}
              </p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={handlePreview}
              className="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Eye className="h-4 w-4" />
              <span className="text-sm">Просмотр</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span className="text-sm">Скачать</span>
            </button>
          </div>
        </div>
      </div>

      {/* PDF Preview */}
      <div className="p-6">
        {/* Mock PDF Content */}
        <div className="border border-gray-300 rounded-lg bg-white shadow-inner">
          {/* PDF Page Simulation */}
          <div className="aspect-[1/1.414] bg-white p-8 text-sm relative overflow-hidden">
            {/* Header */}
            <div className="text-center mb-6 pb-4 border-b border-gray-300">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{resumeData.name}</h1>
              <p className="text-lg text-gray-700">{resumeData.position}</p>
              <div className="flex justify-center space-x-6 mt-2 text-xs text-gray-600">
                <span>📧 ivan.petrov@email.com</span>
                <span>📱 +7 (999) 123-45-67</span>
                <span>📍 Москва</span>
              </div>
            </div>

            {/* Skills Section */}
            <div className="mb-4">
              <h2 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">Навыки</h2>
              <div className="grid grid-cols-3 gap-1 text-xs">
                {resumeData.skills.map((skill: any, idx: number) => (
                  <span 
                    key={idx} 
                    className={`px-2 py-1 rounded text-center ${
                      isAdapted && resumeData.highlightedSkills?.includes(skill)
                        ? 'bg-yellow-200 text-yellow-800 font-medium'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience Section */}
            <div className="mb-4">
              <h2 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">Опыт работы</h2>
              <div className="space-y-3">
                {(isAdapted ? resumeData.adaptedExperience || resumeData.experience : resumeData.experience).map((exp, idx) => (
                  <div key={idx} className="text-xs">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-semibold text-gray-900">{exp.role}</h3>
                        <p className="text-gray-700">{exp.company}</p>
                      </div>
                      <span className="text-gray-600">{exp.period}</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {exp.description.length > 120 ? exp.description.substring(0, 120) + '...' : exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Section */}
            <div className="mb-4">
              <h2 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">Образование</h2>
              <div className="text-xs">
                <h3 className="font-semibold text-gray-900">{resumeData.education}</h3>
                <p className="text-gray-600">2015-2019</p>
              </div>
            </div>

            {/* Languages */}
            <div>
              <h2 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">Языки</h2>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-700">Русский</span>
                  <span className="text-gray-600">Родной</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Английский</span>
                  <span className="text-gray-600">Upper-Intermediate</span>
                </div>
              </div>
            </div>

            {/* Watermark */}
            <div className="absolute bottom-2 right-2 text-[8px] text-gray-400">
              Created with Career Boost Bot
            </div>
          </div>
        </div>

        {/* PDF Actions */}
        <div className="flex justify-center space-x-4 mt-4 pt-4 border-t border-gray-200">
          <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
            <Printer className="h-4 w-4" />
            <span className="text-sm">Печать</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
            <Share2 className="h-4 w-4" />
            <span className="text-sm">Поделиться</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PDFPreview;