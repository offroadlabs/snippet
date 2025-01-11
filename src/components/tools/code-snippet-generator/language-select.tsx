"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import { LANGUAGES } from "./constants";
import { Language } from "./types";

interface LanguageSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

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

export function LanguageSelect({ value, onValueChange }: LanguageSelectProps) {
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
