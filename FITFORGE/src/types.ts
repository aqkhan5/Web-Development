export interface Workout {
  id: string;
  name: string;
  category: "Strength" | "Cardio" | "Mobility" | "Conditioning";
  sets: number;
  reps: number;
  weight: number; // in kg
  durationMinutes: number;
  timestamp: string;
}

export interface UserProgress {
  vo2Max: number;
  recoveryScore: number; // 0-100
  heartRate: number;      // bpm
  caloriesBurned: number;
  dailyStreak: number;
  lastScanned: string;
}

export interface CoachingMessage {
  id: string;
  sender: "user" | "coach";
  text: string;
  timestamp: string;
}

export interface PricingPlan {
  name: string;
  price: number;
  billing: string;
  features: string[];
  isPopular?: boolean;
  colorTheme: "forest" | "navy" | "coral" | "amber";
  pkrPrice: string;
}

export interface AthleteTestimonial {
  name: string;
  role: string;
  feedback: string;
  rating: number;
  avatarUrl: string;
  accent: string;
}
