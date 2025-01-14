import { create } from 'zustand';
import type { ExportOptions } from '@/components/tools/code-snippet-generator/types';

interface CodeGeneratorStore {
  // État
  code: string;
  language: string;
  isExporting: boolean;
  showLineNumbers: boolean;
  exportOptions: ExportOptions;
  title: string;

  // Actions
  setCode: (code: string) => void;
  setLanguage: (language: string) => void;
  setIsExporting: (isExporting: boolean) => void;
  setShowLineNumbers: (show: boolean) => void;
  setExportOptions: (options: Partial<ExportOptions>) => void;
  setTitle: (title: string) => void;
}

export const useCodeGeneratorStore = create<CodeGeneratorStore>((set) => ({
  code: '',
  language: 'typescript',
  isExporting: false,
  showLineNumbers: true,
  exportOptions: {
    format: 'portrait',
    fitContent: true,
    includeWatermark: true,
  },
  title: '',

  setCode: (code) => set({ code }),
  setLanguage: (language) => set({ language }),
  setIsExporting: (isExporting) => set({ isExporting }),
  setShowLineNumbers: (showLineNumbers) => set({ showLineNumbers }),
  setExportOptions: (options) => 
    set((state) => ({ 
      exportOptions: { ...state.exportOptions, ...options } 
    })),
  setTitle: (title) => set({ title }),
})); 