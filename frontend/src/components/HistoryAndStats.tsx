import { History, BarChart3, TrendingUp, Users, FileText, Search, Calendar, Award } from 'lucide-react';

const HistoryAndStats = () => {
  const mockHistory = [
    {
      id: 1,
      position: "Senior Frontend Developer",
      company: "Яндекс",
      date: "2024-01-15",
      status: "responded",
      matchScore: 92
    },
    {
      id: 2,
      position: "React Developer",
      company: "Avito",
      date: "2024-01-14",
      status: "pending",
      matchScore: 87
    },
    {
      id: 3,
      position: "Full Stack Developer",
      company: "Сбер",
      date: "2024-01-12",
      status: "rejected",
      matchScore: 78
    },
    {
      id: 4,
      position: "Frontend Team Lead",
      company: "Ozon",
      date: "2024-01-10",
      status: "interview",
      matchScore: 95
    }
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'responded': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'interview': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'responded': return 'Отклик получен';
      case 'pending': return 'Ожидание';
      case 'rejected': return 'Отказ';
      case 'interview': return 'Собеседование';
      default: return 'Неизвестно';
    }
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Всего резюме</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+3 за неделю</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Адаптаций</p>
              <p className="text-2xl font-bold text-gray-900">28</p>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+8 за неделю</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Поиски вакансий</p>
              <p className="text-2xl font-bold text-gray-900">45</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <Search className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+12 за неделю</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Отклики</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
            <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+2 за неделю</span>
          </div>
        </div>
      </div>

      {/* Recent History */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <History className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">История адаптаций</h2>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {mockHistory.map((item) => (
            <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{item.position}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {getStatusText(item.status)}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{item.company}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(item.date).toLocaleDateString('ru-RU')}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BarChart3 className="h-4 w-4" />
                      <span>Соответствие: {item.matchScore}%</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="w-16 bg-gray-200 rounded-full h-2 mb-1">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${item.matchScore}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600">{item.matchScore}%</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Просмотр
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-6 border-t border-gray-200 text-center">
          <button className="text-blue-600 hover:text-blue-800 font-medium">
            Показать все записи
          </button>
        </div>
      </div>

      {/* Success Rate Chart */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <BarChart3 className="h-6 w-6 text-green-600" />
          <h2 className="text-xl font-semibold text-gray-900">Успешность откликов</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Получен отклик</span>
              <span className="text-sm font-medium text-gray-900">3 из 8 (37.5%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '37.5%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Приглашение на собеседование</span>
              <span className="text-sm font-medium text-gray-900">1 из 8 (12.5%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '12.5%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Ожидание ответа</span>
              <span className="text-sm font-medium text-gray-900">2 из 8 (25%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '25%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Отказ</span>
              <span className="text-sm font-medium text-gray-900">2 из 8 (25%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: '25%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryAndStats;