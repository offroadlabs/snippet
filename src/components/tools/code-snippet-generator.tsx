"use client";

import * as React from "react";
import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import { Textarea } from "@/components/ui/textarea";
import type { PanInfo } from "framer-motion";
import { SITE_URL, STAMP_ICONS } from "./code-snippet-generator/constants";
import { Toolbar } from "./code-snippet-generator/toolbar";
import { CodePreview } from "./code-snippet-generator/code-preview";
import { CaptureOverlay } from "./code-snippet-generator/capture-overlay";
import type { Stamp, ExportOptions } from "./code-snippet-generator/types";

export function CodeSnippetGenerator() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState<string>("typescript");
  const [isExporting, setIsExporting] = useState(false);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: "portrait",
    fitContent: true,
  });
  const [stamps, setStamps] = useState<Stamp[]>([]);
  const [selectedStamp, setSelectedStamp] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [draggedStamp, setDraggedStamp] = useState<string | null>(null);

  const addStamp = useCallback((stampId: string, x: number, y: number) => {
    const selectedIcon = STAMP_ICONS.find((icon) => icon.id === stampId);
    if (!selectedIcon) return;

    setStamps((prev) => [
      ...prev,
      {
        id: `${stampId}-${Date.now()}`,
        x,
        y,
        icon: <div className="text-2xl select-none">{selectedIcon.emoji}</div>,
        isDragging: false,
      },
    ]);
  }, []);

  const handleStampClick = useCallback(
    (stampId: string) => {
      if (!previewRef.current) return;

      const container = previewRef.current.querySelector(".syntax-highlighter");
      if (!container) return;

      const rect = container.getBoundingClientRect();
      // Placer le stamp au centre de la zone de rendu
      const x = rect.width / 2;
      const y = rect.height / 2;

      addStamp(stampId, x, y);
    },
    [addStamp]
  );

  const handlePreviewClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!selectedStamp || !previewRef.current) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const selectedIcon = STAMP_ICONS.find(
        (icon) => icon.id === selectedStamp
      );
      if (!selectedIcon) return;

      setStamps((prev) => [
        ...prev,
        {
          id: `${selectedStamp}-${Date.now()}`,
          x,
          y,
          icon: (
            <div className="text-2xl select-none">{selectedIcon.emoji}</div>
          ),
          isDragging: false,
        },
      ]);

      setSelectedStamp(null);
    },
    [selectedStamp]
  );

  const handleDragStart = (stampId: string) => {
    setDraggedStamp(stampId);
  };

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
    stampId: string
  ) => {
    const stamp = stamps.find((s) => s.id === stampId);
    if (!stamp || !previewRef.current) return;

    const container = previewRef.current.querySelector(".syntax-highlighter");
    if (!container) return;

    const rect = container.getBoundingClientRect();

    // Calculer les nouvelles coordonnées
    let newX = stamp.x + info.offset.x;
    let newY = stamp.y + info.offset.y;

    // Limiter les coordonnées à l'intérieur de la zone de prévisualisation
    newX = Math.max(0, Math.min(newX, rect.width));
    newY = Math.max(0, Math.min(newY, rect.height));

    setStamps((prev) =>
      prev.map((s) =>
        s.id === stampId
          ? {
              ...s,
              x: newX,
              y: newY,
            }
          : s
      )
    );
    setDraggedStamp(null);
  };

  const handleExport = async () => {
    if (!previewRef.current || isExporting) return;

    try {
      setIsExporting(true);
      setIsCapturing(true);

      // Attendre un peu pour que l'animation de flash soit visible
      await new Promise((resolve) => setTimeout(resolve, 300));

      const exportContainer = document.createElement("div");
      exportContainer.style.padding = "48px";
      exportContainer.style.background =
        "linear-gradient(to bottom, rgba(158, 195, 58, 0.05), rgba(36, 135, 199, 0.05))";
      exportContainer.style.borderRadius = "16px";
      exportContainer.style.position = "relative";
      exportContainer.style.display = "flex";
      exportContainer.style.flexDirection = "column";

      if (!exportOptions.fitContent) {
        exportContainer.style.alignItems = "center";
        exportContainer.style.justifyContent = "center";
      }

      // Définir les dimensions selon le format
      if (exportOptions.format === "portrait") {
        exportContainer.style.width = "1080px";
        if (!exportOptions.fitContent) {
          exportContainer.style.height = "1350px";
        }
      } else {
        exportContainer.style.width = "1920px";
        if (!exportOptions.fitContent) {
          exportContainer.style.height = "1080px";
        }
      }

      // Cloner et ajuster le contenu à exporter
      const contentToExport = previewRef.current.cloneNode(true) as HTMLElement;
      contentToExport.style.width = "100%";
      if (!exportOptions.fitContent) {
        contentToExport.style.maxHeight =
          exportOptions.format === "portrait" ? "1200px" : "900px";
      } else {
        contentToExport.style.height = "auto";
      }
      contentToExport.style.display = "flex";
      contentToExport.style.flexDirection = "column";

      // Ajuster la taille du SyntaxHighlighter à l'intérieur du clone
      const syntaxHighlighter = contentToExport.querySelector(
        ".syntax-highlighter"
      ) as HTMLElement;
      if (syntaxHighlighter) {
        syntaxHighlighter.style.minHeight = "unset";
        syntaxHighlighter.style.height = "auto";
      }

      exportContainer.appendChild(contentToExport);

      // Ajouter l'URL en filigrane
      const watermark = document.createElement("div");
      watermark.style.position = "absolute";
      watermark.style.bottom = "16px";
      watermark.style.left = "0";
      watermark.style.width = "100%";
      watermark.style.textAlign = "center";
      watermark.style.color = "rgb(148 163 184)";
      watermark.style.fontSize = "8px";
      watermark.style.fontFamily = "monospace";
      watermark.style.opacity = "0.7";
      watermark.textContent = `Powered by ${SITE_URL}`;
      exportContainer.appendChild(watermark);

      document.body.appendChild(exportContainer);

      // Obtenir les dimensions réelles du contenu
      const contentRect = exportContainer.getBoundingClientRect();

      const canvas = await html2canvas(exportContainer, {
        scale: 2,
        backgroundColor: null,
        logging: false,
        width: exportOptions.format === "portrait" ? 1080 : 1920,
        height: exportOptions.fitContent
          ? Math.ceil(contentRect.height)
          : exportOptions.format === "portrait"
          ? 1350
          : 1080,
      });

      // Nettoyer le DOM
      document.body.removeChild(exportContainer);

      // Convert to blob
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob(
          (blob) => {
            resolve(blob as Blob);
          },
          "image/png",
          1.0
        );
      });

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `code-snippet-${new Date().getTime()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
      setIsCapturing(false);
    }
  };

  const containerAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemAnimation = {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.section
      variants={containerAnimation}
      initial="initial"
      animate="animate"
      className="w-full max-w-4xl mx-auto py-8"
    >
      <div className="space-y-4">
        <motion.div
          variants={itemAnimation}
          className="relative flex flex-col gap-8 p-6 sm:p-8 rounded-3xl bg-background/40 backdrop-blur-xl border border-border/50 shadow-2xl"
        >
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-secondary to-primary rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-1000 animate-gradient-x"></div>
            <Textarea
              placeholder="Paste your code here..."
              className="relative w-full min-h-[300px] font-mono bg-[hsl(var(--code-background))] text-[hsl(var(--code-foreground))] placeholder:text-[hsl(var(--code-foreground)/50)] 
                border-border/50 focus:border-primary/50 resize-none rounded-xl shadow-lg
                transition-all duration-300 focus:shadow-xl"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>

          <Toolbar
            language={language}
            setLanguage={setLanguage}
            exportOptions={exportOptions}
            setExportOptions={setExportOptions}
            showLineNumbers={showLineNumbers}
            setShowLineNumbers={setShowLineNumbers}
            handleExport={handleExport}
            isExporting={isExporting}
            code={code}
            handleStampClick={handleStampClick}
          />

          <CodePreview
            code={code}
            language={language}
            showLineNumbers={showLineNumbers}
            previewRef={previewRef}
            handlePreviewClick={handlePreviewClick}
            stamps={stamps}
            draggedStamp={draggedStamp}
            handleDragStart={handleDragStart}
            handleDragEnd={handleDragEnd}
          />

          <CaptureOverlay isCapturing={isCapturing} />
        </motion.div>
      </div>
    </motion.section>
  );
}
