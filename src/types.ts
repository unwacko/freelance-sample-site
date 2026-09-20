export type ThemeMode = 'light' | 'dark' | 'system';

export interface ManagerReview {
  id: string;
  role: string;
  platform: string;
  rating: number;
  reviewText: string;
  date: string;
}
