export function debounce<T extends unknown[]>(
  func: (...args: T) => void,
  delay: number
) {
  let timer: NodeJS.Timeout;

  return function (...args: T) {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}
