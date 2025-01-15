import {
  Sun,
  SunDim,
  Contrast,
  Palette,
  Sparkles,
  Paintbrush,
} from "lucide-react";
import { ControlButton } from "./control-button";

interface AdjustmentControlsProps {
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
}

export function AdjustmentControls({
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
}: AdjustmentControlsProps) {
  if (
    !onBrightnessIncrease &&
    !onContrastIncrease &&
    !onSaturationIncrease &&
    !onExposureIncrease &&
    !onHueIncrease
  ) {
    return null;
  }

  return (
    <div className="flex items-center gap-0.5">
      {onBrightnessIncrease && onBrightnessDecrease && (
        <>
          <ControlButton
            icon={Sun}
            onClick={onBrightnessIncrease}
            title="Increase brightness"
          />
          <ControlButton
            icon={SunDim}
            onClick={onBrightnessDecrease}
            title="Decrease brightness"
          />
        </>
      )}

      {onContrastIncrease && onContrastDecrease && (
        <>
          <ControlButton
            icon={Contrast}
            onClick={onContrastIncrease}
            title="Increase contrast"
          />
          <ControlButton
            icon={Contrast}
            onClick={onContrastDecrease}
            title="Decrease contrast"
            className="opacity-50"
          />
        </>
      )}

      {onSaturationIncrease && onSaturationDecrease && (
        <>
          <ControlButton
            icon={Palette}
            onClick={onSaturationIncrease}
            title="Increase saturation"
          />
          <ControlButton
            icon={Palette}
            onClick={onSaturationDecrease}
            title="Decrease saturation"
            className="opacity-50"
          />
        </>
      )}

      {onExposureIncrease && onExposureDecrease && (
        <>
          <ControlButton
            icon={Sparkles}
            onClick={onExposureIncrease}
            title="Increase exposure"
          />
          <ControlButton
            icon={Sparkles}
            onClick={onExposureDecrease}
            title="Decrease exposure"
            className="opacity-50"
          />
        </>
      )}

      {onHueIncrease && onHueDecrease && (
        <>
          <ControlButton
            icon={Paintbrush}
            onClick={onHueIncrease}
            title="Increase hue"
          />
          <ControlButton
            icon={Paintbrush}
            onClick={onHueDecrease}
            title="Decrease hue"
            className="opacity-50"
          />
        </>
      )}
    </div>
  );
}
