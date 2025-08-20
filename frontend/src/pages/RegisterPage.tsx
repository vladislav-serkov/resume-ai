import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, Mail, Lock, User, Eye, EyeOff, ArrowLeft, CheckCircle } from 'lucide-react';

const RegisterPage = ({ onRegister }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    position: '',
    experience: '',
    agreeToTerms: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (step === 1) {
      setStep(2);
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const mockUser = {
        id: 1,
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        avatar: `${formData.firstName[0]}${formData.lastName[0]}`,
        position: formData.position,
        experience: formData.experience,
        resumeUploaded: false
      };
      
      onRegister(mockUser);
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const isStep1Valid = formData.firstName && formData.lastName && formData.email && formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;
  const isStep2Valid = formData.position && formData.experience && formData.agreeToTerms;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Back button */}
        <button 
          onClick={() => step === 1 ? navigate('/') : setStep(1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{step === 1 ? 'На главную' : 'Назад'}</span>
        </button>

        {/* Registration Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  {step > 1 ? <CheckCircle className="h-4 w-4" /> : '1'}
                </div>
                <span className="ml-2 text-sm font-medium">Основные данные</span>
              </div>
              <div className={`w-16 h-0.5 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
              <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  2
                </div>
                <span className="ml-2 text-sm font-medium">Профиль</span>
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {step === 1 ? 'Создать аккаунт' : 'Расскажите о себе'}
            </h1>
            <p className="text-gray-600">
              {step === 1 ? 'Присоединяйтесь к SmartCareer' : 'Последний шаг для настройки профиля'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <>
                {/* Name fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Имя
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="Иван"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Фамилия
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="block w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Петров"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Пароль
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      minLength={6}
                      className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Минимум 6 символов"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Подтвердите пароль
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Повторите пароль"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-sm text-red-600 mt-1">Пароли не совпадают</p>
                  )}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                {/* Position */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Желаемая должность
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    required
                    className="block w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Frontend Developer"
                  />
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Опыт работы
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    className="block w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Выберите опыт</option>
                    <option value="no-experience">Без опыта</option>
                    <option value="1-3">1-3 года</option>
                    <option value="3-6">3-6 лет</option>
                    <option value="6+">Более 6 лет</option>
                  </select>
                </div>

                {/* Terms */}
                <div>
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      required
                      className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">
                      Я согласен с{' '}
                      <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                        Условиями использования
                      </a>{' '}
                      и{' '}
                      <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                        Политикой конфиденциальности
                      </a>
                    </span>
                  </label>
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={(step === 1 && !isStep1Valid) || (step === 2 && (!isStep2Valid || isLoading))}
              className="w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:opacity-90 focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Создание аккаунта...
                </>
              ) : step === 1 ? (
                'Продолжить'
              ) : (
                'Создать аккаунт'
              )}
            </button>
          </form>

          {/* Sign in link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Уже есть аккаунт?{' '}
              <Link 
                to="/login" 
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                Войти
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;