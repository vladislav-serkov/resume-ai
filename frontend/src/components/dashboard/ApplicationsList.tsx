import React from 'react';
import { Application } from '../../types';
import { getApplicationStatusLabel, getApplicationStatusStyle } from '../../utils/applicationHelpers';
import { formatDateToRussian } from '../../utils/dateFormatters';

interface ApplicationsListProps {
  applications: Application[];
}

/**
 * List of user's job applications
 */
const ApplicationsList: React.FC<ApplicationsListProps> = ({ applications }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Мои отклики</h2>
      
      <div className="space-y-4">
        {applications.map((application) => (
          <ApplicationCard key={application.id} application={application} />
        ))}
      </div>
      
      {applications.length === 0 && (
        <EmptyApplicationsState />
      )}
    </div>
  );
};

/**
 * Individual application card
 */
interface ApplicationCardProps {
  application: Application;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ application }) => {
  const statusLabel = getApplicationStatusLabel(application.status);
  const statusStyle = getApplicationStatusStyle(application.status);
  const formattedDate = formatDateToRussian(application.date);

  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
      <div>
        <h3 className="font-semibold text-gray-900">{application.position}</h3>
        <p className="text-gray-600">{application.company}</p>
        <p className="text-sm text-gray-500">{formattedDate}</p>
      </div>
      
      <div className="flex items-center space-x-4">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyle}`}>
          {statusLabel}
        </span>
        
        <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
          Подробнее
        </button>
      </div>
    </div>
  );
};

/**
 * Empty state when no applications exist
 */
const EmptyApplicationsState: React.FC = () => (
  <div className="text-center py-8">
    <p className="text-gray-500 mb-4">У вас пока нет откликов на вакансии</p>
    <p className="text-sm text-gray-400">Начните поиск подходящих вакансий на вкладке "Поиск"</p>
  </div>
);

export default ApplicationsList;