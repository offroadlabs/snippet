"use client";

import { Trash } from "lucide-react";
import { ControlButton } from "./ui/control-button";
import { BasicControls } from "./ui/basic-controls";
import { AlignmentControls } from "./ui/alignment-controls";
import { ResetControls } from "./ui/reset-controls";
import { AdjustmentControls } from "./ui/adjustment-controls";

interface DraggableControlsProps {
  onRotateLeft: () => void;
  onRotateRight: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onOpacityIncrease: () => void;
  onOpacityDecrease: () => void;
  onDelete: () => void;
  onAlignLeft?: () => void;
  onAlignCenter?: () => void;
  onAlignRight?: () => void;
  onAlignTop?: () => void;
  onAlignMiddle?: () => void;
  onAlignBottom?: () => void;
  onResetRotation?: () => void;
  onResetScale?: () => void;
  onResetOpacity?: () => void;
  onBrightnessIncrease?: () => void;
  onBrightnessDecrease?: () => void;
  onContrastIncrease?: () => void;
  onContrastDecrease?: () => void;
  onSaturationIncrease?: () => void;
  onSaturationDecrease?: () => void;
  onExposureIncrease?: () => void;
  onExposureDecrease?: () => void;
  onHueIncrease?: () => void;
  onHueDecrease?: () => void;
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

export function DraggableControls({
  onRotateLeft,
  onRotateRight,
  onZoomIn,
  onZoomOut,
  onOpacityIncrease,
  onOpacityDecrease,
  onDelete,
  onAlignLeft,
  onAlignCenter,
  onAlignRight,
  onAlignTop,
  onAlignMiddle,
  onAlignBottom,
  onResetRotation,
  onResetScale,
  onResetOpacity,
  onBrightnessIncrease,
  onBrightnessDecrease,
  onContrastIncrease,
  onContrastDecrease,
  onSaturationIncrease,
  onSaturationDecrease,
  onExposureIncrease,
  onExposureDecrease,
  onHueIncrease,
  onHueDecrease,
  onResetAdjustments,
}: DraggableControlsProps) {
  return (
    <div className="absolute -translate-y-full -top-2 left-1/2 -translate-x-1/2 flex flex-col gap-1 bg-background/90 backdrop-blur-md rounded-lg border border-border shadow-xl p-1 no-export z-50">
      {/* First Row - Transform, Alignment, Reset, and Delete Controls */}
      <div className="flex items-center gap-0.5">
        <BasicControls
          onRotateLeft={onRotateLeft}
          onRotateRight={onRotateRight}
          onZoomIn={onZoomIn}
          onZoomOut={onZoomOut}
          onOpacityIncrease={onOpacityIncrease}
          onOpacityDecrease={onOpacityDecrease}
        />
        <div className="w-px h-3.5 bg-gradient-to-b from-primary/30 to-secondary/30" />
        <AlignmentControls
          onAlignLeft={onAlignLeft}
          onAlignCenter={onAlignCenter}
          onAlignRight={onAlignRight}
          onAlignTop={onAlignTop}
          onAlignMiddle={onAlignMiddle}
          onAlignBottom={onAlignBottom}
        />
        {(onResetRotation ||
          onResetScale ||
          onResetOpacity ||
          onResetAdjustments) && (
          <>
            <div className="w-px h-3.5 bg-gradient-to-b from-primary/30 to-secondary/30" />
            <ResetControls
              onResetRotation={onResetRotation}
              onResetScale={onResetScale}
              onResetOpacity={onResetOpacity}
              onResetAdjustments={onResetAdjustments}
            />
          </>
        )}
        <div className="w-px h-3.5 bg-gradient-to-b from-primary/30 to-secondary/30" />
        <ControlButton
          icon={Trash}
          onClick={onDelete}
          title="Delete"
          variant="danger"
        />
      </div>

      {/* Second Row - Image Adjustments */}
      <AdjustmentControls
        onBrightnessIncrease={onBrightnessIncrease}
        onBrightnessDecrease={onBrightnessDecrease}
        onContrastIncrease={onContrastIncrease}
        onContrastDecrease={onContrastDecrease}
        onSaturationIncrease={onSaturationIncrease}
        onSaturationDecrease={onSaturationDecrease}
        onExposureIncrease={onExposureIncrease}
        onExposureDecrease={onExposureDecrease}
        onHueIncrease={onHueIncrease}
        onHueDecrease={onHueDecrease}
      />
    </div>
  );
}
