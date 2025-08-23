// Application status labels
export const APPLICATION_STATUS_LABELS = {
  interview: 'Собеседование',
  response: 'Ответ получен',
  pending: 'Ожидание',
  rejected: 'Отказ'
} as const;

// Application status styles
export const APPLICATION_STATUS_STYLES = {
  interview: 'bg-blue-100 text-blue-800',
  response: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  rejected: 'bg-red-100 text-red-800'
} as const;