import React from 'react';
import { Download, Sparkles, User, Mail, Phone, MapPin, Calendar, Briefcase, GraduationCap } from 'lucide-react';

const ResumeViewer = ({ resumeData, isAdapted = false }) => {
  if (!resumeData) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg border max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">{resumeData.name}</h1>
            <p className="text-lg opacity-90">{resumeData.position}</p>
            {isAdapted && (
              <div className="flex items-center space-x-2 mt-2">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-medium">Адаптировано под вакансию</span>
              </div>
            )}
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 mb-1">
              <Mail className="h-4 w-4" />
              <span className="text-sm">ivan.petrov@email.com</span>
            </div>
            <div className="flex items-center space-x-2 mb-1">
              <Phone className="h-4 w-4" />
              <span className="text-sm">+7 (999) 123-45-67</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">Москва</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Summary */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <User className="h-5 w-5 mr-2 text-blue-600" />
            О себе
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Опытный Frontend разработчик с 5+ летним опытом создания современных веб-приложений. 
            Специализируюсь на React, TypeScript и современных технологиях. Имею опыт работы в команде 
            и менторства младших разработчиков.
            {isAdapted && " Готов применить свои навыки для решения задач вашей команды."}
          </p>
        </div>

        {/* Skills */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Навыки</h2>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, idx) => (
              <span 
                key={idx} 
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  isAdapted && resumeData.highlightedSkills?.includes(skill)
                    ? 'bg-purple-100 text-purple-800 border border-purple-300'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {skill}
                {isAdapted && resumeData.highlightedSkills?.includes(skill) && (
                  <Sparkles className="inline-block h-3 w-3 ml-1" />
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Briefcase className="h-5 w-5 mr-2 text-blue-600" />
            Опыт работы
          </h2>
          <div className="space-y-4">
            {(isAdapted ? resumeData.adaptedExperience : resumeData.experience).map((exp, idx) => (
              <div key={idx} className="border-l-4 border-blue-200 pl-4 pb-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{exp.role}</h3>
                    <p className="text-blue-600 font-medium">{exp.company}</p>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    {exp.period}
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
            Образование
          </h2>
          <div className="border-l-4 border-blue-200 pl-4">
            <h3 className="font-semibold text-gray-900">{resumeData.education}</h3>
            <p className="text-gray-600 text-sm">2015-2019</p>
          </div>
        </div>

        {/* Languages */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Языки</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Русский</span>
              <span className="text-sm text-gray-600">Родной</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Английский</span>
              <span className="text-sm text-gray-600">Upper-Intermediate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-6 py-4 rounded-b-xl">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {isAdapted ? 'Адаптированное резюме' : 'Оригинальное резюме'} • Создано в Career Boost Bot
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="h-4 w-4" />
            <span>Скачать PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeViewer;