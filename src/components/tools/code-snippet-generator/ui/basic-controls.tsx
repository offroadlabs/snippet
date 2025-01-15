import {
  Eye,
  EyeOff,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { ControlButton } from "./control-button";

interface BasicControlsProps {
  onRotateLeft: () => void;
  onRotateRight: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onOpacityIncrease: () => void;
  onOpacityDecrease: () => void;
}

export function BasicControls({
  onRotateLeft,
  onRotateRight,
  onZoomIn,
  onZoomOut,
  onOpacityIncrease,
  onOpacityDecrease,
}: BasicControlsProps) {
  return (
    <div className="flex items-center gap-0.5">
      <ControlButton
        icon={RotateCcw}
        onClick={onRotateLeft}
        title="Rotate left (45°)"
      />
      <ControlButton
        icon={RotateCw}
        onClick={onRotateRight}
        title="Rotate right (45°)"
      />
      <div className="w-px h-3.5 bg-gradient-to-b from-primary/30 to-secondary/30" />
      <ControlButton icon={ZoomIn} onClick={onZoomIn} title="Zoom in" />
      <ControlButton icon={ZoomOut} onClick={onZoomOut} title="Zoom out" />
      <div className="w-px h-3.5 bg-gradient-to-b from-primary/30 to-secondary/30" />
      <ControlButton
        icon={Eye}
        onClick={onOpacityIncrease}
        title="More opaque"
      />
      <ControlButton
        icon={EyeOff}
        onClick={onOpacityDecrease}
        title="More transparent"
      />
    </div>
  );
}
