export type ExportFormat = 
  | "portrait"
  | "landscape" 
  | "x-post"
  | "x-card"
  | "linkedin-post"
  | "linkedin-article";

export interface ExportOptions {
  format: ExportFormat;
  fitContent: boolean;
  includeWatermark: boolean;
}

export interface Language {
  id: string;
  name: string;
}

export interface Stamp {
  id: string;
  x: number;
  y: number;
  icon: React.ReactNode;
  isDragging?: boolean;
}

export interface StampIcon {
  id: string;
  emoji: string;
  label: string;
}

export interface FormatOption {
  id: ExportFormat;
  label: string;
  dimensions: string;
  description?: string;
} 