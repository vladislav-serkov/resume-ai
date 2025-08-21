import { useNavigate } from 'react-router-dom';
import { 
  Bot, 
  Zap, 
  Target, 
  TrendingUp, 
  CheckCircle, 
  Users, 
  Star,
  ArrowRight,
  Play,
  Clock,
  Award,
  Sparkles
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Bot,
      title: "AI-адаптация резюме",
      description: "Искусственный интеллект автоматически подстраивает ваше резюме под каждую вакансию",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Zap,
      title: "Автоотклик",
      description: "Автоматическая подача откликов на подходящие вакансии 24/7",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Target,
      title: "Точное соответствие",
      description: "Анализ требований вакансии и выделение ключевых навыков в резюме",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: TrendingUp,
      title: "Рост откликов",
      description: "В 3 раза больше положительных ответов от работодателей",
      color: "bg-orange-100 text-orange-600"
    }
  ];

  const stats = [
    { number: "85%", label: "Рост откликов", icon: TrendingUp },
    { number: "24/7", label: "Работа автобота", icon: Clock },
    { number: "500+", label: "Успешных трудоустройств", icon: Award },
    { number: "50k+", label: "Пользователей", icon: Users }
  ];

  const testimonials = [
    {
      name: "Анна Иванова",
      position: "Frontend Developer в Яндекс",
      avatar: "AI",
      text: "Благодаря SmartCareer получила 3 предложения за неделю! AI действительно умеет подстраивать резюме под вакансии."
    },
    {
      name: "Михаил Петров", 
      position: "Product Manager в Сбер",
      avatar: "МП",
      text: "Автоотклик экономит массу времени. Пока я работал, бот подавал заявки на идеальные вакансии."
    },
    {
      name: "Елена Смирнова",
      position: "UX Designer в Ozon", 
      avatar: "ЕС",
      text: "Процент положительных откликов вырос в 4 раза. Теперь рекомендую всем друзьям!"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SmartCareer
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/dashboard')}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Войти
              </button>
              <button 
                onClick={() => navigate('/dashboard')}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:opacity-90 transition-opacity font-medium"
              >
                Начать поиск
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  🚀 Новое поколение поиска работы
                </span>
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Найди работу мечты с 
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {" "}AI-помощником
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Первая платформа, которая автоматически адаптирует ваше резюме под каждую вакансию 
                и отправляет отклики, пока вы спите. Увеличьте свои шансы в 3 раза!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:opacity-90 transition-opacity font-semibold text-lg"
                >
                  <span>Начать бесплатно</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button className="flex items-center justify-center space-x-2 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 transition-colors font-semibold">
                  <Play className="h-5 w-5" />
                  <span>Смотреть демо</span>
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-8 flex items-center px-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                    <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                    <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Bot className="h-8 w-8 text-blue-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">AI-ассистент активен</h3>
                      <p className="text-sm text-gray-600">Анализирую новые вакансии...</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-sm font-medium text-green-900">Frontend Developer - Яндекс</span>
                      </div>
                      <span className="text-xs text-green-700">Отклик отправлен</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center space-x-3">
                        <Zap className="h-5 w-5 text-blue-600" />
                        <span className="text-sm font-medium text-blue-900">React Developer - Avito</span>
                      </div>
                      <span className="text-xs text-blue-700">Адаптирую резюме...</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <Clock className="h-5 w-5 text-gray-600" />
                        <span className="text-sm font-medium text-gray-900">Senior Developer - Сбер</span>
                      </div>
                      <span className="text-xs text-gray-700">В очереди</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating cards */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg border border-gray-200 p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-semibold text-gray-900">+185% откликов</span>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg border border-gray-200 p-4">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm font-semibold text-gray-900">4.9/5 рейтинг</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Почему SmartCareer эффективнее традиционного поиска?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Наша AI-технология анализирует тысячи вакансий и автоматически подстраивает 
              ваше резюме под требования каждой позиции
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
                <div className={`inline-flex items-center justify-center w-14 h-14 ${feature.color} rounded-2xl mb-6`}>
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Как это работает?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Всего 3 простых шага до трудоустройства мечты
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Загрузите резюме</h3>
              <p className="text-gray-600">
                Просто загрузите ваше резюме в PDF формате. Наш AI проанализирует ваши навыки и опыт
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-6">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Настройте параметры</h3>
              <p className="text-gray-600">
                Укажите желаемую позицию, зарплату и локацию. AI будет искать подходящие вакансии
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Получайте предложения</h3>
              <p className="text-gray-600">
                AI автоматически адаптирует резюме и отправляет отклики. Вы получаете уведомления о результатах
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Истории успеха</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Тысячи специалистов уже нашли работу мечты с помощью SmartCareer
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.position}</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Готовы найти работу мечты?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Присоединяйтесь к тысячам специалистов, которые уже получают предложения каждый день
          </p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center space-x-3 px-10 py-4 bg-white text-gray-900 rounded-xl hover:bg-gray-100 transition-colors font-semibold text-lg"
          >
            <span>Начать поиск бесплатно</span>
            <ArrowRight className="h-5 w-5" />
          </button>
          <p className="text-blue-200 mt-4">Первые 100 откликов - бесплатно</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">SmartCareer</h3>
              </div>
              <p className="text-gray-400">
                AI-платформа для поиска работы нового поколения
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Продукт</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Как это работает</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Тарифы</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Помощь</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Блог</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Карьера</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Пресса</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SmartCareer. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;