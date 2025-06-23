export const initializeHealthKit = (callback: (error: string | null) => void) => {
    console.log("[HealthKit] Initialization simulated.");
    callback(null);
  };
  
  // Mock Data
  const mockDistance = 3.2; // miles
  const mockHeartRate = 75; // bpm
  const mockCalories = 350; // kcal
  
  export const fetchRunningDistance = (
    startDate: Date,
    endDate: Date,
    callback: (error: string | null, data?: number) => void
  ) => {
    console.log(`[HealthKit] Simulating fetching running distance between ${startDate} and ${endDate}`);
    callback(null, mockDistance);
  };
  
  export const fetchHeartRate = (
    startDate: Date,
    endDate: Date,
    callback: (error: string | null, data?: number) => void
  ) => {
    console.log(`[HealthKit] Simulating fetching heart rate between ${startDate} and ${endDate}`);
    callback(null, mockHeartRate);
  };
  
  export const fetchCaloriesBurned = (
    startDate: Date,
    endDate: Date,
    callback: (error: string | null, data?: number) => void
  ) => {
    console.log(`[HealthKit] Simulating fetching calories burned between ${startDate} and ${endDate}`);
    callback(null, mockCalories);
  };