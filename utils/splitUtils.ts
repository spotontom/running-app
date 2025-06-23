/**
 * Calculate split times for each mile.
 * @param distances Array of cumulative distances (e.g., [1, 2, 3])
 * @param times Array of cumulative times in seconds (e.g., [480, 960, 1440])
 * @returns Array of split times per mile
 */
export const calculateSplits = (distances: number[], times: number[]): string[] => {
    const splits: string[] = [];
  
    for (let i = 1; i < distances.length; i++) {
      const splitTime = times[i] - times[i - 1];
      splits.push(formatTime(splitTime));
    }
  
    return splits;
  };
  
  // Import the time formatting function
  import { formatTime } from './timeUtils';