
export enum TabType {
  DASHBOARD = 'dashboard',
  CHAT = 'chat',
  WELLNESS_FINDER = 'wellness_finder',
  IMAGE_LAB = 'image_lab',
}

export interface WellnessMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  status: 'good' | 'warning' | 'alert';
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  timestamp: number;
  groundingLinks?: Array<{ uri: string; title: string }>;
}

export type ImageSize = '1K' | '2K' | '4K';
export type AspectRatio = '1:1' | '3:4' | '4:3' | '9:16' | '16:9';

export interface GeneratedImage {
  url: string;
  prompt: string;
  timestamp: number;
}
