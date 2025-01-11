"use client";

import { Button } from "@/components/ui/button";
import { StampIcon } from "./types";

interface StampSectionProps {
  title: string;
  stamps: StampIcon[];
  onStampClick: (stampId: string) => void;
}

export function StampSection({
  title,
  stamps,
  onStampClick,
}: StampSectionProps) {
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
