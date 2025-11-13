/**
 * Утилитарная функция для вибрации устройства
 * @param duration - длительность вибрации в миллисекундах или паттерн
 * @returns boolean - true если вибрация выполнена, false если не поддерживается
 */
export const vibrate = (duration: number | number[] = 200): boolean => {
  try {
    // Проверяем наличие API вибрации
    if (typeof window !== 'undefined' && window.navigator && 'vibrate' in window.navigator) {
      const result = window.navigator.vibrate(duration);
      // Логируем для отладки (можно убрать в продакшене)
      if (process.env.NODE_ENV === 'development') {
        console.log('Вибрация вызвана:', duration, 'Результат:', result);
      }
      return result;
    } else {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Вибрация не поддерживается браузером');
      }
      return false;
    }
  } catch (error) {
    console.warn('Ошибка при вызове вибрации:', error);
    return false;
  }
};

/**
 * Проверяет, поддерживается ли вибрация в браузере
 * @returns boolean - true если вибрация поддерживается
 */
export const isVibrationSupported = (): boolean => {
  return !!(window.navigator && window.navigator.vibrate);
}; 