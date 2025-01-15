import {
  RotateCw as RotateClockwise,
  Maximize2,
  Eye as EyeReset,
  Sun,
  Contrast,
  Palette,
  Sparkles,
  Paintbrush,
  RefreshCw as Reset,
} from "lucide-react";
import { ControlButton } from "./control-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ResetControlsProps {
  onResetRotation?: () => void;
  onResetScale?: () => void;
  onResetOpacity?: () => void;
  onResetAdjustments?: (
    adjustments: Partial<{
      brightness: number;
      contrast: number;
      saturation: number;
      exposure: number;
      hue: number;
    }>
  ) => void;
}

export function ResetControls({
  onResetRotation,
  onResetScale,
  onResetOpacity,
  onResetAdjustments,
}: ResetControlsProps) {
  if (
    !onResetRotation &&
    !onResetScale &&
    !onResetOpacity &&
    !onResetAdjustments
  ) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ControlButton icon={Reset} title="Reset options" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-background/90 backdrop-blur-md border-border shadow-xl z-[100]"
        side="top"
        align="start"
      >
        {onResetRotation && (
          <DropdownMenuItem
            onClick={onResetRotation}
            className="hover:bg-primary/20 focus:bg-primary/20"
          >
            <RotateClockwise className="h-3.5 w-3.5 mr-2" />
            Reset rotation
          </DropdownMenuItem>
        )}
        {onResetScale && (
          <DropdownMenuItem
            onClick={onResetScale}
            className="hover:bg-primary/20 focus:bg-primary/20"
          >
            <Maximize2 className="h-3.5 w-3.5 mr-2" />
            Reset scale
          </DropdownMenuItem>
        )}
        {onResetOpacity && (
          <DropdownMenuItem
            onClick={onResetOpacity}
            className="hover:bg-primary/20 focus:bg-primary/20"
          >
            <EyeReset className="h-3.5 w-3.5 mr-2" />
            Reset opacity
          </DropdownMenuItem>
        )}
        {onResetAdjustments && (
          <>
            <DropdownMenuItem
              onClick={() => onResetAdjustments({ brightness: 1 })}
              className="hover:bg-primary/20 focus:bg-primary/20"
            >
              <Sun className="h-3.5 w-3.5 mr-2" />
              Reset brightness
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onResetAdjustments({ contrast: 1 })}
              className="hover:bg-primary/20 focus:bg-primary/20"
            >
              <Contrast className="h-3.5 w-3.5 mr-2" />
              Reset contrast
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onResetAdjustments({ saturation: 1 })}
              className="hover:bg-primary/20 focus:bg-primary/20"
            >
              <Palette className="h-3.5 w-3.5 mr-2" />
              Reset saturation
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onResetAdjustments({ exposure: 1 })}
              className="hover:bg-primary/20 focus:bg-primary/20"
            >
              <Sparkles className="h-3.5 w-3.5 mr-2" />
              Reset exposure
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onResetAdjustments({ hue: 0 })}
              className="hover:bg-primary/20 focus:bg-primary/20"
            >
              <Paintbrush className="h-3.5 w-3.5 mr-2" />
              Reset hue
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
