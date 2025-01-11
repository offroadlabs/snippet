"use client";

import * as React from "react";
import { useState, useRef, useCallback } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import * as themes from "react-syntax-highlighter/dist/esm/styles/prism";
import html2canvas from "html2canvas";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Download,
  Hash,
  Smartphone,
  Monitor,
  Expand,
  Smile,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { motion, AnimatePresence } from "framer-motion";
import type { PanInfo } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Language {
  id: string;
  name: string;
}

type ExportFormat = "landscape" | "portrait";

interface ExportOptions {
  format: ExportFormat;
  fitContent: boolean;
}

interface Stamp {
  id: string;
  x: number;
  y: number;
  icon: React.ReactNode;
  isDragging?: boolean;
}

interface StampIcon {
  id: string;
  emoji: string;
  label: string;
}

interface StampSectionProps {
  title: string;
  stamps: StampIcon[];
  onStampClick: (stampId: string) => void;
}

function StampSection({ title, stamps, onStampClick }: StampSectionProps) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-0.5">
        <div className="h-3.5 w-0.5 bg-gradient-to-b from-primary to-secondary rounded-full" />
        <h4 className="text-sm font-medium text-foreground">{title}</h4>
      </div>
      <div className="grid grid-cols-6 gap-0.5">
        {stamps.map((stampIcon) => (
          <Button
            key={stampIcon.id}
            variant="ghost"
            size="sm"
            onClick={() => onStampClick(stampIcon.id)}
            className="h-9 w-9 p-0 hover:bg-primary/10 hover:text-primary"
            title={stampIcon.label}
          >
            <span className="text-lg">{stampIcon.emoji}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}

const LANGUAGES: Language[] = [
  // Langages principaux
  { id: "typescript", name: "TypeScript" },
  { id: "javascript", name: "JavaScript" },
  { id: "python", name: "Python" },
  { id: "java", name: "Java" },
  { id: "php", name: "PHP" },
  { id: "csharp", name: "C#" },
  { id: "cpp", name: "C++" },
  { id: "go", name: "Go" },
  { id: "rust", name: "Rust" },
  { id: "ruby", name: "Ruby" },
  { id: "swift", name: "Swift" },
  { id: "kotlin", name: "Kotlin" },

  // Web
  { id: "html", name: "HTML" },
  { id: "css", name: "CSS" },
  { id: "scss", name: "SCSS" },
  { id: "jsx", name: "JSX" },
  { id: "tsx", name: "TSX" },

  // Base de données
  { id: "sql", name: "SQL" },
  { id: "mongodb", name: "MongoDB" },
  { id: "graphql", name: "GraphQL" },

  // Configuration
  { id: "json", name: "JSON" },
  { id: "yaml", name: "YAML" },
  { id: "toml", name: "TOML" },
  { id: "ini", name: "INI" },
  { id: "docker", name: "Dockerfile" },

  // Shell
  { id: "bash", name: "Bash" },
  { id: "powershell", name: "PowerShell" },

  // Autres
  { id: "markdown", name: "Markdown" },
  { id: "latex", name: "LaTeX" },
  { id: "r", name: "R" },
  { id: "matlab", name: "MATLAB" },
];

const SITE_URL = "https://snippet.timoner.com";

const STAMP_ICONS: StampIcon[] = [
  // Validation et erreurs
  { id: "check", emoji: "✅", label: "Validated" },
  { id: "error", emoji: "❌", label: "Error" },
  { id: "warning", emoji: "⚠️", label: "Warning" },
  { id: "info", emoji: "ℹ️", label: "Information" },
  { id: "question", emoji: "❓", label: "Question" },
  { id: "exclamation", emoji: "❗", label: "Important" },

  // Basic emojis
  { id: "smile", emoji: "🙂", label: "Smile" },
  { id: "sad", emoji: "🙁", label: "Sad" },
  { id: "laugh", emoji: "😄", label: "Laugh" },
  { id: "wink", emoji: "😉", label: "Wink" },
  { id: "love", emoji: "😍", label: "Love" },
  { id: "cool", emoji: "😎", label: "Cool" },
  { id: "thinking", emoji: "🤔", label: "Thinking" },
  { id: "mindblown", emoji: "🤯", label: "Mind Blown" },
  { id: "worried", emoji: "😟", label: "Worried" },
  { id: "confused", emoji: "😕", label: "Confused" },
  { id: "crazy", emoji: "🤪", label: "Crazy" },
  { id: "nerd", emoji: "🤓", label: "Nerd" },

  // Reactions
  { id: "party", emoji: "🎉", label: "Party" },
  { id: "fire", emoji: "🔥", label: "Fire" },
  { id: "hundred", emoji: "💯", label: "Perfect" },
  { id: "clap", emoji: "👏", label: "Clap" },
  { id: "tada", emoji: "🎊", label: "Tada" },
  { id: "trophy", emoji: "🏆", label: "Trophy" },
  { id: "medal", emoji: "🥇", label: "Medal" },
  { id: "sparkles", emoji: "✨", label: "Sparkles" },

  // Tech
  { id: "bug", emoji: "🐛", label: "Bug" },
  { id: "rocket", emoji: "🚀", label: "Rocket" },
  { id: "robot", emoji: "🤖", label: "Robot" },
  { id: "alien", emoji: "👾", label: "Alien" },
  { id: "laptop", emoji: "💻", label: "Laptop" },
  { id: "gear", emoji: "⚙️", label: "Settings" },
  { id: "tools", emoji: "🛠️", label: "Tools" },
  { id: "microscope", emoji: "🔬", label: "Debug" },

  // Communication
  { id: "eyes", emoji: "👀", label: "Eyes" },
  { id: "shush", emoji: "🤫", label: "Shush" },
  { id: "think", emoji: "💭", label: "Think" },
  { id: "speak", emoji: "💬", label: "Speak" },
  { id: "point", emoji: "👉", label: "Point" },
  { id: "handshake", emoji: "🤝", label: "Collaboration" },
  { id: "writing", emoji: "✍️", label: "Writing" },
  { id: "megaphone", emoji: "📢", label: "Announce" },

  // Misc
  { id: "heart", emoji: "❤️", label: "Heart" },
  { id: "star", emoji: "⭐", label: "Star" },
  { id: "rainbow", emoji: "🌈", label: "Rainbow" },
  { id: "clock", emoji: "⏰", label: "Clock" },
  { id: "target", emoji: "🎯", label: "Target" },
  { id: "idea", emoji: "💡", label: "Idea" },
  { id: "magic", emoji: "🪄", label: "Magic" },
  { id: "lock", emoji: "🔒", label: "Security" },
];

// Composant pour la barre d'outils
interface ToolbarProps {
  language: string;
  setLanguage: (value: string) => void;
  exportOptions: ExportOptions;
  setExportOptions: React.Dispatch<React.SetStateAction<ExportOptions>>;
  showLineNumbers: boolean;
  setShowLineNumbers: (value: boolean) => void;
  handleExport: () => void;
  isExporting: boolean;
  code: string;
  handleStampClick: (stampId: string) => void;
}

function Toolbar({
  language,
  setLanguage,
  exportOptions,
  setExportOptions,
  showLineNumbers,
  setShowLineNumbers,
  handleExport,
  isExporting,
  code,
  handleStampClick,
}: ToolbarProps & { handleStampClick: (stampId: string) => void }) {
  const [isStampPopoverOpen, setIsStampPopoverOpen] = useState(false);

  const handleStampSelection = (stampId: string) => {
    handleStampClick(stampId);
    setIsStampPopoverOpen(false);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-between">
      <div className="flex items-center gap-4 flex-wrap">
        <LanguageSelect value={language} onValueChange={setLanguage} />
        <ExportFormatToggle
          exportOptions={exportOptions}
          setExportOptions={setExportOptions}
        />
        <Toggle
          pressed={showLineNumbers}
          onPressedChange={setShowLineNumbers}
          className="bg-background/50 text-foreground border-border/50 hover:bg-background/70 data-[state=on]:bg-primary/20 transition-all duration-300"
          aria-label="Toggle line numbers"
        >
          <Hash className="h-4 w-4" />
        </Toggle>
        <Popover open={isStampPopoverOpen} onOpenChange={setIsStampPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 
                border-border hover:border-border/80 transition-all duration-300 rounded-lg shadow-sm hover:shadow-md"
              aria-label="Add stamps"
            >
              <Smile className="w-4 h-4 text-primary" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-[280px] p-0 border-border/50 bg-background/95 backdrop-blur-sm shadow-lg"
            align="end"
            sideOffset={5}
          >
            <div className="p-1.5">
              <div className="grid gap-1.5">
                <StampSection
                  title="Validation"
                  stamps={STAMP_ICONS.slice(0, 6)}
                  onStampClick={handleStampSelection}
                />
                <StampSection
                  title="Expressions"
                  stamps={STAMP_ICONS.slice(6, 18)}
                  onStampClick={handleStampSelection}
                />
                <StampSection
                  title="Reactions"
                  stamps={STAMP_ICONS.slice(18, 26)}
                  onStampClick={handleStampSelection}
                />
                <StampSection
                  title="Tech"
                  stamps={STAMP_ICONS.slice(26, 34)}
                  onStampClick={handleStampSelection}
                />
                <StampSection
                  title="Communication"
                  stamps={STAMP_ICONS.slice(34, 42)}
                  onStampClick={handleStampSelection}
                />
                <StampSection
                  title="Misc"
                  stamps={STAMP_ICONS.slice(42)}
                  onStampClick={handleStampSelection}
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <Button
        onClick={handleExport}
        disabled={isExporting || !code}
        className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 
          text-white shadow-lg transition-all duration-300 hover:shadow-xl 
          disabled:opacity-50 disabled:cursor-not-allowed px-6 py-2.5 rounded-xl"
      >
        <Download className="w-4 h-4 mr-2" />
        {isExporting ? "Exporting..." : "Export PNG"}
      </Button>
    </div>
  );
}

// Composant pour le sélecteur de langage
interface LanguageSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

function LanguageSelect({ value, onValueChange }: LanguageSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px] bg-background/50 text-foreground border-border/50 hover:bg-background/70 transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent className="bg-background/90 backdrop-blur-xl border-border/50 shadow-xl">
        <LanguageGroup
          label="Langages principaux"
          languages={LANGUAGES.slice(0, 12)}
        />
        <LanguageGroup label="Web" languages={LANGUAGES.slice(12, 17)} />
        <LanguageGroup
          label="Base de données"
          languages={LANGUAGES.slice(17, 20)}
        />
        <LanguageGroup
          label="Configuration"
          languages={LANGUAGES.slice(20, 25)}
        />
        <LanguageGroup label="Shell" languages={LANGUAGES.slice(25, 27)} />
        <LanguageGroup label="Autres" languages={LANGUAGES.slice(27)} />
      </SelectContent>
    </Select>
  );
}

// Composant pour un groupe de langages
interface LanguageGroupProps {
  label: string;
  languages: Language[];
}

function LanguageGroup({ label, languages }: LanguageGroupProps) {
  return (
    <SelectGroup>
      <SelectLabel className="text-muted-foreground font-semibold mt-2 border-t border-border/50 pt-2">
        {label}
      </SelectLabel>
      {languages.map((lang) => (
        <SelectItem
          key={lang.id}
          value={lang.id}
          className="text-foreground focus:bg-primary/20 focus:text-foreground cursor-pointer transition-colors pl-6"
        >
          {lang.name}
        </SelectItem>
      ))}
    </SelectGroup>
  );
}

// Composant pour les toggles de format d'export
interface ExportFormatToggleProps {
  exportOptions: ExportOptions;
  setExportOptions: React.Dispatch<React.SetStateAction<ExportOptions>>;
}

function ExportFormatToggle({
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
        aria-label="Export en paysage"
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
        aria-label="Export en portrait"
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
        aria-label="Ajuster à la taille du contenu"
      >
        <Expand className="h-4 w-4" />
      </Toggle>
    </div>
  );
}

// Composant pour le prévisualisateur de code
interface CodePreviewProps {
  code: string;
  language: string;
  showLineNumbers: boolean;
  previewRef: React.RefObject<HTMLDivElement | null>;
  handlePreviewClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  stamps: Stamp[];
  draggedStamp: string | null;
  handleDragStart: (stampId: string) => void;
  handleDragEnd: (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
    stampId: string
  ) => void;
}

function CodePreview({
  code,
  language,
  showLineNumbers,
  previewRef,
  handlePreviewClick,
  stamps,
  draggedStamp,
  handleDragStart,
  handleDragEnd,
}: CodePreviewProps) {
  return (
    <div className="relative group min-w-0">
      <div ref={previewRef}>
        <div className="relative border border-border/50 rounded-xl overflow-hidden bg-[hsl(var(--code-background))] shadow-lg transition-all duration-300 group-hover:shadow-xl">
          <PreviewHeader />
          <div className="relative" onClick={handlePreviewClick}>
            <SyntaxHighlighter
              language={language}
              style={themes.vscDarkPlus}
              customStyle={{
                margin: 0,
                padding: "1.5rem",
                minHeight: "400px",
                background: "transparent",
                fontSize: "14px",
                color: "hsl(var(--code-foreground))",
                position: "relative",
              }}
              showLineNumbers={showLineNumbers}
              wrapLongLines={false}
              className="scrollbar-thin scrollbar-track-background/20 scrollbar-thumb-border/50 hover:scrollbar-thumb-border/70 syntax-highlighter"
            >
              {code || "// Your code will appear here"}
            </SyntaxHighlighter>
            <StampsOverlay
              stamps={stamps}
              draggedStamp={draggedStamp}
              handleDragStart={handleDragStart}
              handleDragEnd={handleDragEnd}
              previewRef={previewRef}
            />
          </div>
        </div>
      </div>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-secondary to-primary rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-1000 animate-gradient-x -z-10"></div>
    </div>
  );
}

// Composant pour l'en-tête du prévisualisateur
function PreviewHeader() {
  return (
    <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-border/50 bg-[hsl(var(--code-background))] backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-destructive/80 shadow-sm" />
        <div className="w-3 h-3 rounded-full bg-warning/80 shadow-sm" />
        <div className="w-3 h-3 rounded-full bg-success/80 shadow-sm" />
      </div>
    </div>
  );
}

// Composant pour l'overlay des tampons
interface StampsOverlayProps {
  stamps: Stamp[];
  draggedStamp: string | null;
  handleDragStart: (stampId: string) => void;
  handleDragEnd: (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
    stampId: string
  ) => void;
  previewRef: React.RefObject<HTMLDivElement | null>;
}

function StampsOverlay({
  stamps,
  draggedStamp,
  handleDragStart,
  handleDragEnd,
  previewRef,
}: StampsOverlayProps) {
  return (
    <div className="absolute inset-0 cursor-crosshair">
      {stamps.map((stamp) => {
        const container = previewRef.current?.querySelector(
          ".syntax-highlighter"
        );
        const bounds = container?.getBoundingClientRect();

        return (
          <motion.div
            key={stamp.id}
            drag
            dragMomentum={false}
            dragConstraints={{
              left: 0,
              top: 0,
              right: bounds?.width || 0,
              bottom: bounds?.height || 0,
            }}
            onDragStart={() => handleDragStart(stamp.id)}
            onDragEnd={(e, info) => handleDragEnd(e, info, stamp.id)}
            initial={false}
            animate={{ x: stamp.x, y: stamp.y }}
            whileDrag={{ scale: 1.1, zIndex: 50 }}
            className={cn(
              "absolute cursor-grab touch-none select-none",
              draggedStamp === stamp.id && "cursor-grabbing z-50"
            )}
            style={{ touchAction: "none" }}
          >
            {stamp.icon}
          </motion.div>
        );
      })}
    </div>
  );
}

// Composant pour l'overlay de capture
interface CaptureOverlayProps {
  isCapturing: boolean;
}

function CaptureOverlay({ isCapturing }: CaptureOverlayProps) {
  return (
    <AnimatePresence>
      {isCapturing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-white/30 backdrop-blur-sm rounded-xl z-10"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", damping: 15 }}
              className="bg-background/90 backdrop-blur-sm text-foreground px-4 py-2 rounded-lg shadow-lg"
            >
              Capturing...
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function CodeSnippetGenerator() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState<string>("typescript");
  const [isExporting, setIsExporting] = useState(false);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: "landscape",
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
