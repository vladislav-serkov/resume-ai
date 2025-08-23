import React from 'react';
import { Check, Sparkles, Crown, Zap } from 'lucide-react';

interface PricingTier {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  icon: React.ComponentType<any>;
  features: string[];
  buttonText: string;
  buttonVariant: 'outline' | 'primary' | 'premium';
  popular?: boolean;
}

/**
 * Страница тарифов - отображает доступные тарифные планы
 */
const PricingPage: React.FC = () => {
  const pricingTiers: PricingTier[] = [
    {
      id: 'trial',
      name: 'Пробный',
      price: '0',
      period: '7 дней',
      description: 'Попробуйте возможности платформы бесплатно',
      icon: Sparkles,
      features: [
        '5 откликов в день',
        'Базовая адаптация резюме',
        'Простая статистика',
        'Email уведомления',
        'Поддержка в чате'
      ],
      buttonText: 'Начать пробный период',
      buttonVariant: 'outline'
    },
    {
      id: 'standard',
      name: 'Стандарт',
      price: '1990',
      period: 'месяц',
      description: 'Оптимальный план для активного поиска работы',
      icon: Zap,
      features: [
        '20 откликов в день',
        'Умная адаптация резюме',
        'Расширенная статистика',
        'Telegram уведомления',
        'ATS-оптимизация',
        'Приоритетная поддержка',
        'Черный список компаний'
      ],
      buttonText: 'Выбрать план',
      buttonVariant: 'primary',
      popular: true
    },
    {
      id: 'pro',
      name: 'Про',
      price: '3990',
      period: 'месяц',
      description: 'Максимальные возможности для профессионалов',
      icon: Crown,
      features: [
        'Безлимитные отклики',
        'ИИ-копирайтинг сопроводительных писем',
        'Детальная аналитика',
        'Персональный менеджер',
        'Максимальная ATS-оптимизация',
        'Интеграция с LinkedIn',
        'Все функции Стандарт плана',
        'API доступ'
      ],
      buttonText: 'Выбрать план',
      buttonVariant: 'premium'
    }
  ];

  const getButtonClasses = (variant: string) => {
    switch (variant) {
      case 'primary':
        return 'w-full bg-blue-600 text-white hover:bg-blue-700 py-3 px-4 rounded-lg font-medium transition-colors';
      case 'premium':
        return 'w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 py-3 px-4 rounded-lg font-medium transition-all';
      default:
        return 'w-full border border-gray-300 text-gray-700 hover:bg-gray-50 py-3 px-4 rounded-lg font-medium transition-colors';
    }
  };

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Тарифные планы</h1>
        <p className="text-gray-600 mt-2 text-lg">
          Выберите план, который подходит вашим потребностям
        </p>
      </div>

      {/* Pricing cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {pricingTiers.map((tier) => {
          const Icon = tier.icon;
          
          return (
            <div
              key={tier.id}
              className={`relative bg-white rounded-2xl shadow-lg border p-8 ${
                tier.popular ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-20' : 'border-gray-200'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Популярный
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{tier.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{tier.description}</p>
              </div>

              {/* Price */}
              <div className="text-center mb-6">
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-900">₽{tier.price}</span>
                  <span className="text-gray-600 ml-2">/{tier.period}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button className={getButtonClasses(tier.buttonVariant)}>
                {tier.buttonText}
              </button>
            </div>
          );
        })}
      </div>

      {/* Additional info */}
      <div className="bg-blue-50 rounded-xl p-6 text-center max-w-4xl mx-auto">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          Все планы включают 30-дневную гарантию возврата средств
        </h3>
        <p className="text-blue-700">
          Не подошел план? Верним деньги без вопросов в течение 30 дней
        </p>
      </div>
    </div>
  );
};

export default PricingPage;