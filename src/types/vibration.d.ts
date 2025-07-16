interface Navigator {
  vibrate(pattern: number | number[]): boolean;
}

interface Window {
  navigator: Navigator;
} 