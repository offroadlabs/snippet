"use client";

import { Monitor, Smartphone, Expand } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { ExportOptions } from "./types";

interface ExportFormatToggleProps {
  exportOptions: ExportOptions;
  setExportOptions: React.Dispatch<React.SetStateAction<ExportOptions>>;
}

export function ExportFormatToggle({
  exportOptions,
  setExportOptions,
}: ExportFormatToggleProps) {
  return (
    <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm rounded-xl p-1.5 shadow-lg">
      <Toggle
        pressed={exportOptions.format === "landscape"}
        onPressedChange={() =>
          setExportOptions((prev: ExportOptions) => ({
            ...prev,
            format: "landscape",
          }))
        }
        className="bg-background/50 text-foreground border-border/50 hover:bg-background/70 data-[state=on]:bg-primary/20 transition-all duration-300"
        aria-label="Export in landscape"
      >
        <Monitor className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={exportOptions.format === "portrait"}
        onPressedChange={() =>
          setExportOptions((prev: ExportOptions) => ({
            ...prev,
            format: "portrait",
          }))
        }
        className="bg-background/50 text-foreground border-border/50 hover:bg-background/70 data-[state=on]:bg-primary/20 transition-all duration-300"
        aria-label="Export in portrait"
      >
        <Smartphone className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={exportOptions.fitContent}
        onPressedChange={(pressed) =>
          setExportOptions((prev: ExportOptions) => ({
            ...prev,
            fitContent: pressed,
          }))
        }
        className="bg-background/50 text-foreground border-border/50 hover:bg-background/70 data-[state=on]:bg-primary/20 transition-all duration-300"
        aria-label="Fit to content"
      >
        <Expand className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={exportOptions.includeWatermark}
        onPressedChange={(pressed) =>
          setExportOptions((prev: ExportOptions) => ({
            ...prev,
            includeWatermark: pressed,
          }))
        }
        className="bg-background/50 text-foreground border-border/50 hover:bg-background/70 data-[state=on]:bg-primary/20 transition-all duration-300"
        aria-label="Include watermark"
      >
        Watermark
      </Toggle>
    </div>
  );
}
