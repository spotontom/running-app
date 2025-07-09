export type Run = {
    id: string;
    uid: string;
    date: string;
    distance: number;
    time: string;
    pace: string;
    heartRate?: number;
    calories?: number;
    splits?: string[];
    createdAt?: string;
  };