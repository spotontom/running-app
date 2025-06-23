/**
 * Calculate the pace per mile or kilometer.
 * @param timeInSeconds Total time in seconds
 * @param distance Total distance in miles or kilometers
 * @returns Formatted pace string (minutes:seconds per mile)
 */
export const calculatePace = (timeInSeconds: number, distance: number): string => {
    if (distance <= 0) return "0:00";
  
    const paceInSeconds = timeInSeconds / distance;
    const minutes = Math.floor(paceInSeconds / 60);
    const seconds = Math.round(paceInSeconds % 60);
  
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds} min/mile`;
  };