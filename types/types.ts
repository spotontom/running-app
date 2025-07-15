export type Run = {
    id: string;
    uid: string;
    date: string;
    totalDistance: number;
    time: string;
    pace?: string;
    heartRate?: number;
    calories?: number;
    splits?: string[];
    createdAt?: string;
  };