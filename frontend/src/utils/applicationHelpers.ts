import { ApplicationStatus } from '../types';
import { APPLICATION_STATUS_LABELS, APPLICATION_STATUS_STYLES } from '../constants';

/**
 * Get human readable label for application status
 * @param status - Application status enum value
 * @returns Localized status label
 */
export const getApplicationStatusLabel = (status: ApplicationStatus): string => {
  return APPLICATION_STATUS_LABELS[status];
};

/**
 * Get CSS classes for application status styling
 * @param status - Application status enum value
 * @returns CSS class string for status badge
 */
export const getApplicationStatusStyle = (status: ApplicationStatus): string => {
  return APPLICATION_STATUS_STYLES[status];
};