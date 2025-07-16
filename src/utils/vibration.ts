/**
 * Утилитарная функция для вибрации устройства
 * @param duration - длительность вибрации в миллисекундах или паттерн
 * @returns boolean - true если вибрация выполнена, false если не поддерживается
 */
export const vibrate = (duration: number | number[] = 200): boolean => {
  try {
    if (window.navigator && window.navigator.vibrate) {
      return window.navigator.vibrate(duration);
    }
    return false;
  } catch (error) {
    console.warn('Вибрация не поддерживается:', error);
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