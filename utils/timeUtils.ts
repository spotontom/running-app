/**
 * Format time in seconds to minutes:seconds
 * @param timeInSeconds Time in seconds
 * @returns Formatted string (MM:SS)
 */
export const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.round(timeInSeconds % 60);
  
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };