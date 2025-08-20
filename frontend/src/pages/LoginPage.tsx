import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { User, LoginHandler, LoginFormData } from '../types';

interface LoginPageProps {
  onLogin: LoginHandler;
}

/**
 * Login page component with form validation and demo credentials
 */
const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });

  /**
   * Handle form submission and authentication
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockUser: User = {
        name: 'Иван Петров',
        email: formData.email,
        avatar: 'ИП',
        position: 'Frontend Developer'
      };
      
      onLogin(mockUser);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle input field changes
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Toggle password visibility
   */
  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <BackToHomeButton onClick={() => navigate('/')} />

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          <LoginHeader />
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <EmailField
              value={formData.email}
              onChange={handleInputChange}
            />
            
            <PasswordField
              value={formData.password}
              showPassword={showPassword}
              onToggleVisibility={togglePasswordVisibility}
              onChange={handleInputChange}
            />

            <FormOptions />

            <SubmitButton isLoading={isLoading} />
          </form>

          <DemoCredentials />
          
          <SignUpLink />
        </div>

        <FeaturePreview />
      </div>
    </div>
  );
};

/**
 * Back to home button
 */
interface BackToHomeButtonProps {
  onClick: () => void;
}

const BackToHomeButton: React.FC<BackToHomeButtonProps> = ({ onClick }) => (
  <button 
    onClick={onClick}
    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
    type="button"
  >
    <ArrowLeft className="h-4 w-4" />
    <span>На главную</span>
  </button>
);

/**
 * Login form header
 */
const LoginHeader: React.FC = () => (
  <div className="text-center mb-8">
    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4">
      <Sparkles className="h-8 w-8 text-white" />
    </div>
    <h1 className="text-2xl font-bold text-gray-900 mb-2">Добро пожаловать!</h1>
    <p className="text-gray-600">Войдите в свой аккаунт SmartCareer</p>
  </div>
);

/**
 * Email input field
 */
interface EmailFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmailField: React.FC<EmailFieldProps> = ({ value, onChange }) => (
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
        value={value}
        onChange={onChange}
        required
        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        placeholder="your@email.com"
      />
    </div>
  </div>
);

/**
 * Password input field
 */
interface PasswordFieldProps {
  value: string;
  showPassword: boolean;
  onToggleVisibility: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ 
  value, 
  showPassword, 
  onToggleVisibility, 
  onChange 
}) => (
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
        value={value}
        onChange={onChange}
        required
        className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        placeholder="Введите пароль"
      />
      <button
        type="button"
        onClick={onToggleVisibility}
        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
      >
        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
      </button>
    </div>
  </div>
);

/**
 * Form options (remember me, forgot password)
 */
const FormOptions: React.FC = () => (
  <div className="flex items-center justify-between">
    <label className="flex items-center">
      <input
        type="checkbox"
        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <span className="ml-2 text-sm text-gray-600">Запомнить меня</span>
    </label>
    <a href="#" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
      Забыли пароль?
    </a>
  </div>
);

/**
 * Submit button with loading state
 */
interface SubmitButtonProps {
  isLoading: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isLoading }) => (
  <button
    type="submit"
    disabled={isLoading}
    className="w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:opacity-90 focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
  >
    {isLoading ? (
      <>
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
        Вход в систему...
      </>
    ) : (
      'Войти'
    )}
  </button>
);

/**
 * Demo credentials information
 */
const DemoCredentials: React.FC = () => (
  <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
    <p className="text-sm text-blue-800 mb-2 font-medium">📝 Демо-аккаунт:</p>
    <p className="text-xs text-blue-700">Email: demo@smartcareer.com</p>
    <p className="text-xs text-blue-700">Пароль: любой</p>
  </div>
);

/**
 * Sign up link
 */
const SignUpLink: React.FC = () => (
  <div className="mt-8 text-center">
    <p className="text-gray-600">
      Нет аккаунта?{' '}
      <Link 
        to="/register" 
        className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
      >
        Зарегистрироваться
      </Link>
    </p>
  </div>
);

/**
 * Features preview section
 */
const FeaturePreview: React.FC = () => (
  <div className="mt-8 grid grid-cols-2 gap-4">
    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
      <div className="text-center">
        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
          <span className="text-green-600 text-xs font-bold">AI</span>
        </div>
        <p className="text-xs text-gray-600 font-medium">Умная адаптация</p>
      </div>
    </div>
    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
      <div className="text-center">
        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
          <span className="text-purple-600 text-xs font-bold">24/7</span>
        </div>
        <p className="text-xs text-gray-600 font-medium">Автоотклик</p>
      </div>
    </div>
  </div>
);

export default LoginPage;