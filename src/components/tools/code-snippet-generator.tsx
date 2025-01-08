"use client";

import { useState, useRef } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import * as themes from "react-syntax-highlighter/dist/esm/styles/prism";
import html2canvas from "html2canvas";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Download, Hash, Smartphone, Monitor, Expand } from "lucide-react";
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

interface Language {
  id: string;
  name: string;
}

type ExportFormat = "landscape" | "portrait";

interface ExportOptions {
  format: ExportFormat;
  fitContent: boolean;
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

interface CodeSnippetGeneratorProps {
  description?: string;
}

export function CodeSnippetGenerator({
  description,
}: CodeSnippetGeneratorProps) {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState<string>("typescript");
  const [isExporting, setIsExporting] = useState(false);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: "landscape",
    fitContent: true,
  });
  const previewRef = useRef<HTMLDivElement>(null);

  const handleExport = async () => {
    if (!previewRef.current || isExporting) return;

    try {
      setIsExporting(true);

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
      watermark.style.fontSize = "14px";
      watermark.style.fontFamily = "monospace";
      watermark.style.opacity = "0.7";
      watermark.textContent = `❤️ ${SITE_URL}❤️`;
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
    }
  };

  return (
    <section className="w-full max-w-4xl mx-auto py-8">
      <div className="space-y-4">
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300">
            {description ||
              `A powerful tool to generate and format your code snippets. 
              Perfect for developers wanting to share their code in a clear and professional way. 
              Supports over 30 programming languages with syntax highlighting.`}
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            <span className="text-sm text-primary">Supported languages:</span>
            <span className="text-sm text-secondary">TypeScript</span>
            <span className="text-sm text-secondary">JavaScript</span>
            <span className="text-sm text-secondary">Python</span>
            <span className="text-sm text-secondary">Java</span>
            <span className="text-sm text-secondary">and more...</span>
          </div>
        </div>

        <div className="relative flex flex-col gap-8 p-6 sm:p-8 rounded-3xl bg-background/40 backdrop-blur-xl border border-border/50 shadow-2xl">
          <div className="flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-between">
            <div className="flex items-center gap-4 flex-wrap">
              <Select
                value={language}
                onValueChange={(value) => setLanguage(value)}
              >
                <SelectTrigger className="w-[180px] bg-background/50 text-foreground border-border/50 hover:bg-background/70 transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent className="bg-background/90 backdrop-blur-xl border-border/50 shadow-xl">
                  <SelectGroup>
                    <SelectLabel className="text-muted-foreground font-semibold">
                      Langages principaux
                    </SelectLabel>
                    {LANGUAGES.slice(0, 12).map((lang) => (
                      <SelectItem
                        key={lang.id}
                        value={lang.id}
                        className="text-foreground focus:bg-primary/20 focus:text-foreground cursor-pointer transition-colors pl-6"
                      >
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>

                  <SelectGroup>
                    <SelectLabel className="text-muted-foreground font-semibold mt-2 border-t border-border/50 pt-2">
                      Web
                    </SelectLabel>
                    {LANGUAGES.slice(12, 17).map((lang) => (
                      <SelectItem
                        key={lang.id}
                        value={lang.id}
                        className="text-foreground focus:bg-primary/20 focus:text-foreground cursor-pointer transition-colors pl-6"
                      >
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>

                  <SelectGroup>
                    <SelectLabel className="text-muted-foreground font-semibold mt-2 border-t border-border/50 pt-2">
                      Base de données
                    </SelectLabel>
                    {LANGUAGES.slice(17, 20).map((lang) => (
                      <SelectItem
                        key={lang.id}
                        value={lang.id}
                        className="text-foreground focus:bg-primary/20 focus:text-foreground cursor-pointer transition-colors pl-6"
                      >
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>

                  <SelectGroup>
                    <SelectLabel className="text-muted-foreground font-semibold mt-2 border-t border-border/50 pt-2">
                      Configuration
                    </SelectLabel>
                    {LANGUAGES.slice(20, 25).map((lang) => (
                      <SelectItem
                        key={lang.id}
                        value={lang.id}
                        className="text-foreground focus:bg-primary/20 focus:text-foreground cursor-pointer transition-colors pl-6"
                      >
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>

                  <SelectGroup>
                    <SelectLabel className="text-muted-foreground font-semibold mt-2 border-t border-border/50 pt-2">
                      Shell
                    </SelectLabel>
                    {LANGUAGES.slice(25, 27).map((lang) => (
                      <SelectItem
                        key={lang.id}
                        value={lang.id}
                        className="text-foreground focus:bg-primary/20 focus:text-foreground cursor-pointer transition-colors pl-6"
                      >
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>

                  <SelectGroup>
                    <SelectLabel className="text-muted-foreground font-semibold mt-2 border-t border-border/50 pt-2">
                      Autres
                    </SelectLabel>
                    {LANGUAGES.slice(27).map((lang) => (
                      <SelectItem
                        key={lang.id}
                        value={lang.id}
                        className="text-foreground focus:bg-primary/20 focus:text-foreground cursor-pointer transition-colors pl-6"
                      >
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm rounded-xl p-1.5 shadow-lg">
                <Toggle
                  pressed={exportOptions.format === "landscape"}
                  onPressedChange={() =>
                    setExportOptions((prev) => ({
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
                    setExportOptions((prev) => ({
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
                    setExportOptions((prev) => ({
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

              <Toggle
                pressed={showLineNumbers}
                onPressedChange={setShowLineNumbers}
                className="bg-background/50 text-foreground border-border/50 hover:bg-background/70 data-[state=on]:bg-primary/20 transition-all duration-300"
                aria-label="Toggle line numbers"
              >
                <Hash className="h-4 w-4" />
              </Toggle>
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

          <div className="relative group min-w-0">
            <div ref={previewRef}>
              <div className="relative border border-border/50 rounded-xl overflow-hidden bg-[hsl(var(--code-background))] shadow-lg transition-all duration-300 group-hover:shadow-xl">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-[hsl(var(--code-background))] backdrop-blur-sm">
                  <div className="w-3 h-3 rounded-full bg-destructive/80 shadow-sm" />
                  <div className="w-3 h-3 rounded-full bg-warning/80 shadow-sm" />
                  <div className="w-3 h-3 rounded-full bg-success/80 shadow-sm" />
                </div>
                <div className="overflow-auto">
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
                    }}
                    showLineNumbers={showLineNumbers}
                    wrapLongLines={false}
                    className="scrollbar-thin scrollbar-track-background/20 scrollbar-thumb-border/50 hover:scrollbar-thumb-border/70 syntax-highlighter"
                  >
                    {code || "// Your code will appear here"}
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-secondary to-primary rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-1000 animate-gradient-x -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
