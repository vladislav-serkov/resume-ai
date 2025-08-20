import { MATCH_SCORE_COLORS } from '../constants';

/**
 * Get CSS classes for match score display based on score value
 * @param match - Match score percentage (0-100)
 * @returns CSS class string for styling
 */
export const getMatchScoreColor = (match: number): string => {
  if (match >= 90) return MATCH_SCORE_COLORS.EXCELLENT;
  if (match >= 70) return MATCH_SCORE_COLORS.GOOD;
  if (match >= 50) return MATCH_SCORE_COLORS.FAIR;
  return MATCH_SCORE_COLORS.POOR;
};

/**
 * Get match score category text
 * @param match - Match score percentage (0-100)
 * @returns Human readable category
 */
export const getMatchScoreCategory = (match: number): string => {
  if (match >= 90) return 'Отличное соответствие';
  if (match >= 70) return 'Хорошее соответствие';
  if (match >= 50) return 'Среднее соответствие';
  return 'Слабое соответствие';
};