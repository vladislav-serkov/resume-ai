/**
 * Format date to Russian locale string
 * @param dateString - ISO date string
 * @returns Formatted date string
 */
export const formatDateToRussian = (dateString: string): string => {
  try {
    return new Date(dateString).toLocaleDateString('ru-RU');
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

/**
 * Format date to relative time string
 * @param dateString - ISO date string
 * @returns Relative time string like "2 часа назад"
 */
export const formatRelativeTime = (dateString: string): string => {
  try {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} мин назад`;
    }
    
    if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} час${hours === 1 ? '' : hours < 5 ? 'а' : 'ов'} назад`;
    }
    
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} день назад`;
  } catch (error) {
    console.error('Error formatting relative time:', error);
    return dateString;
  }
};