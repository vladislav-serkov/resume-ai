import React, { useState } from 'react';
import { User, Phone, Crown, Edit2, Save, X } from 'lucide-react';

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
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: 'Анна Иванова',
    phone: '+7 (999) 123-45-67',
    subscription: {
      plan: 'Стандарт',
      status: 'Активна',
      expiresAt: '15 августа 2024'
    }
  });

  const [editData, setEditData] = useState<ProfileData>(profileData);

  const handleEdit = () => {
    setEditData(profileData);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
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
                АИ
              </div>
              <div className="text-white">
                <h2 className="text-2xl font-bold">{profileData.fullName}</h2>
                <p className="text-blue-100">Frontend Developer</p>
              </div>
            </div>
            
            {!isEditing && (
              <button
                onClick={handleEdit}
                className="flex items-center space-x-2 px-4 py-2 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-colors"
              >
                <Edit2 className="h-4 w-4" />
                <span>Редактировать</span>
              </button>
            )}
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
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.fullName}
                    onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{profileData.fullName}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Номер телефона
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editData.phone}
                    onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-gray-900 py-2 flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-gray-500" />
                    {profileData.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Edit buttons */}
            {isEditing && (
              <div className="flex space-x-3 mt-4">
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Save className="h-4 w-4" />
                  <span>Сохранить</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  <X className="h-4 w-4" />
                  <span>Отмена</span>
                </button>
              </div>
            )}
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
                    Тариф "{profileData.subscription.plan}"
                  </h4>
                  <p className="text-gray-600">
                    Действует до {profileData.subscription.expiresAt}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSubscriptionStatusColor(profileData.subscription.status)}`}>
                  {profileData.subscription.status}
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