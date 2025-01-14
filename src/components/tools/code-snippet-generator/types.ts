export type ExportFormat = "landscape" | "portrait";

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