import React, { useState, useEffect } from 'react';
import { User, Phone, Crown } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface ProfileData {
  fullName: string;
  phone: string;
  subscription: {
    plan: string;
    status: string;
    expiresAt: string;
  };
}

/**
 * Страница профиля - управление личными данными и информацией о подписке
 */
const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  // Если пользователь не залогинен, показываем заглушку
  if (!user) {
    return <div>Загрузка профиля...</div>;
  }

  // Формируем ФИО
  const fullName = user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Не указано';
  const phone = user.phone || 'Не указано';
  const email = user.email || 'Не указано';

  // subscription оставляем заглушкой
  const subscription = {
    plan: 'Стандарт',
    status: 'Активна',
    expiresAt: '15 августа 2024'
  };

  const getSubscriptionStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'активна':
        return 'text-green-700 bg-green-100';
      case 'истекает':
        return 'text-orange-700 bg-orange-100';
      case 'неактивна':
        return 'text-red-700 bg-red-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Профиль</h1>
        <p className="text-gray-600 mt-1">
          Управление личными данными и подпиской
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-20 w-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user.name ? user.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() : 'U'}
              </div>
              <div className="text-white">
                <h2 className="text-2xl font-bold">{fullName}</h2>
                <p className="text-blue-100">{email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-blue-600" />
              Личная информация
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ФИО
                </label>
                <p className="text-gray-900 py-2">{fullName}</p>
              </div>
              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Номер телефона
                </label>
                <p className="text-gray-900 py-2 flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gray-500" />
                  {phone}
                </p>
              </div>
            </div>
          </div>

          {/* Subscription Information */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Crown className="h-5 w-5 mr-2 text-purple-600" />
              Подписка
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-lg font-medium text-gray-900">
                    Тариф "{subscription.plan}"
                  </h4>
                  <p className="text-gray-600">
                    Действует до {subscription.expiresAt}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSubscriptionStatusColor(subscription.status)}`}>
                  {subscription.status}
                </span>
              </div>
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Изменить тариф
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  История платежей
                </button>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="border-t border-gray-200 pt-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Полезная информация</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Ваш профиль заполнен на 85%</li>
                <li>• Для лучших результатов добавьте резюме</li>
                <li>• Настройте уведомления в разделе "Настройки"</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;