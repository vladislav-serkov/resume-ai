// import React, { useState, useEffect } from 'react';
// import { BackendApplication } from '../../types';
// import { authService } from '../../services/authService';
// import { ExternalLink, Calendar, Building, MapPin, Clock } from 'lucide-react';
//
// /**
//  * Real applications list that fetches data from backend
//  */
// const RealApplicationsList: React.FC = () => {
//   const [applications, setApplications] = useState<BackendApplication[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//
//   useEffect(() => {
//     loadApplications();
//   }, []);
//
//   const loadApplications = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await authService.getUserApplications();
//
//       if (response.success) {
//         setApplications(response.applications);
//       } else {
//         setError('Не удалось загрузить отклики');
//       }
//     } catch (err) {
//       console.error('Error loading applications:', err);
//       setError('Ошибка загрузки откликов');
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   const getStatusColor = (status: string) => {
//     switch (status.toUpperCase()) {
//       case 'SENT':
//         return 'bg-blue-100 text-blue-800';
//       case 'VIEWED':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'INVITED':
//         return 'bg-green-100 text-green-800';
//       case 'REJECTED':
//         return 'bg-red-100 text-red-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };
//
//   const getStatusLabel = (status: string) => {
//     switch (status.toUpperCase()) {
//       case 'SENT':
//         return 'Отправлено';
//       case 'VIEWED':
//         return 'Просмотрено';
//       case 'INVITED':
//         return 'Приглашение';
//       case 'REJECTED':
//         return 'Отклонено';
//       default:
//         return status;
//     }
//   };
//
//   const formatDate = (dateStr: string) => {
//     const date = new Date(dateStr);
//     return new Intl.DateTimeFormat('ru-RU', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     }).format(date);
//   };
//
//   if (loading) {
//     return (
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//         <h2 className="text-2xl font-bold text-gray-900 mb-6">Мои отклики</h2>
//         <div className="flex items-center justify-center py-8">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//           <span className="ml-2 text-gray-600">Загрузка откликов...</span>
//         </div>
//       </div>
//     );
//   }
//
//   if (error) {
//     return (
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//         <h2 className="text-2xl font-bold text-gray-900 mb-6">Мои отклики</h2>
//         <div className="text-center py-8">
//           <p className="text-red-600 mb-4">{error}</p>
//           <button
//             onClick={loadApplications}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Попробовать снова
//           </button>
//         </div>
//       </div>
//     );
//   }
//
//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-2xl font-bold text-gray-900">Мои отклики</h2>
//         <button
//           onClick={loadApplications}
//           className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
//         >
//           Обновить
//         </button>
//       </div>
//
//       <div className="space-y-4">
//         {applications.map((application) => (
//           <ApplicationCard key={application.id} application={application} />
//         ))}
//       </div>
//
//       {applications.length === 0 && (
//         <EmptyApplicationsState />
//       )}
//     </div>
//   );
// };
//
// interface ApplicationCardProps {
//   application: BackendApplication;
// }
//
// const ApplicationCard: React.FC<ApplicationCardProps> = ({ application }) => {
//   const statusColor = getStatusColor(application.status);
//   const statusLabel = getStatusLabel(application.status);
//   const appliedDate = formatDate(application.appliedAt);
//
//   return (
//     <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
//       <div className="flex items-start justify-between">
//         <div className="flex-1">
//           <div className="flex items-center space-x-2 mb-2">
//             <h3 className="font-semibold text-gray-900">{application.vacancy.name}</h3>
//             <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
//               {statusLabel}
//             </span>
//           </div>
//
//           <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
//             <div className="flex items-center space-x-1">
//               <Building className="h-4 w-4" />
//               <span>{application.vacancy.company}</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <MapPin className="h-4 w-4" />
//               <span>{application.vacancy.area}</span>
//             </div>
//           </div>
//
//           <div className="flex items-center space-x-4 text-sm text-gray-500">
//             <div className="flex items-center space-x-1">
//               <Clock className="h-4 w-4" />
//               <span>Отправлено: {appliedDate}</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <Calendar className="h-4 w-4" />
//               <span>Опубликовано: {formatDate(application.vacancy.publishedAt)}</span>
//             </div>
//           </div>
//
//           {application.coverLetter && (
//             <div className="mt-3 p-3 bg-gray-50 rounded-lg">
//               <p className="text-sm text-gray-700 italic">
//                 "{application.coverLetter}"
//               </p>
//             </div>
//           )}
//         </div>
//
//         <div className="ml-4">
//           <a
//             href={application.vacancy.url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 font-medium transition-colors"
//           >
//             <ExternalLink className="h-4 w-4" />
//             <span>Открыть</span>
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// const EmptyApplicationsState: React.FC = () => (
//   <div className="text-center py-8">
//     <p className="text-gray-500 mb-4">У вас пока нет откликов на вакансии</p>
//     <p className="text-sm text-gray-400">
//       Используйте кнопку "Найти вакансии" в блоке AI-Ассистент для автоматического поиска и отклика
//     </p>
//   </div>
// );
//
// // Helper functions (moved outside to avoid re-declaration)
// const getStatusColor = (status: string) => {
//   switch (status.toUpperCase()) {
//     case 'SENT':
//       return 'bg-blue-100 text-blue-800';
//     case 'VIEWED':
//       return 'bg-yellow-100 text-yellow-800';
//     case 'INVITED':
//       return 'bg-green-100 text-green-800';
//     case 'REJECTED':
//       return 'bg-red-100 text-red-800';
//     default:
//       return 'bg-gray-100 text-gray-800';
//   }
// };
//
// const getStatusLabel = (status: string) => {
//   switch (status.toUpperCase()) {
//     case 'SENT':
//       return 'Отправлено';
//     case 'VIEWED':
//       return 'Просмотрено';
//     case 'INVITED':
//       return 'Приглашение';
//     case 'REJECTED':
//       return 'Отклонено';
//     default:
//       return status;
//   }
// };
//
// const formatDate = (dateStr: string) => {
//   const date = new Date(dateStr);
//   return new Intl.DateTimeFormat('ru-RU', {
//     day: '2-digit',
//     month: '2-digit',
//     year: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit'
//   }).format(date);
// };
//
// export default RealApplicationsList;