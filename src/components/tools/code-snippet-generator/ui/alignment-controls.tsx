import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignStartVertical,
  AlignCenterVertical,
  AlignEndVertical,
} from "lucide-react";
import { ControlButton } from "./control-button";

interface AlignmentControlsProps {
  onAlignLeft?: () => void;
  onAlignCenter?: () => void;
  onAlignRight?: () => void;
  onAlignTop?: () => void;
  onAlignMiddle?: () => void;
  onAlignBottom?: () => void;
}

export function AlignmentControls({
  onAlignLeft,
  onAlignCenter,
  onAlignRight,
  onAlignTop,
  onAlignMiddle,
  onAlignBottom,
}: AlignmentControlsProps) {
  if (
    !onAlignLeft &&
    !onAlignCenter &&
    !onAlignRight &&
    !onAlignTop &&
    !onAlignMiddle &&
    !onAlignBottom
  ) {
    return null;
  }

  return (
    <div className="flex items-center gap-0.5">
      {onAlignLeft && (
        <ControlButton
          icon={AlignLeft}
          onClick={onAlignLeft}
          title="Align left"
        />
      )}
      {onAlignCenter && (
        <ControlButton
          icon={AlignCenter}
          onClick={onAlignCenter}
          title="Align center"
        />
      )}
      {onAlignRight && (
        <ControlButton
          icon={AlignRight}
          onClick={onAlignRight}
          title="Align right"
        />
      )}
      {onAlignTop && (
        <ControlButton
          icon={AlignStartVertical}
          onClick={onAlignTop}
          title="Align top"
        />
      )}
      {onAlignMiddle && (
        <ControlButton
          icon={AlignCenterVertical}
          onClick={onAlignMiddle}
          title="Align middle"
        />
      )}
      {onAlignBottom && (
        <ControlButton
          icon={AlignEndVertical}
          onClick={onAlignBottom}
          title="Align bottom"
        />
      )}
    </div>
  );
}
