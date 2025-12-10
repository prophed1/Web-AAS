import React from 'react';

export enum SectionId {
  BASICS = 'basics',
  COMPONENTS = 'components',
  FLAME = 'flame',
  INTERFERENCE = 'interference',
  QUANTITATIVE = 'quantitative',
  SIMULATION = 'simulation',
  AI_TUTOR = 'ai_tutor'
}

export interface ContentSection {
  id: SectionId;
  title: string;
  icon: React.ElementType;
  content: string; // Markdown-like or raw text
  summary?: string[];
}

export interface ChartDataPoint {
  concentration: number;
  absorbance: number;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  isError?: boolean;
}