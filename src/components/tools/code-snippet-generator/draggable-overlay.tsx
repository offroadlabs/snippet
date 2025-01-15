"use client";

import { motion } from "framer-motion";
import type { PanInfo } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Stamp } from "./types";
import { useCodeGeneratorStore } from "@/store/code-generator-store";
import { DraggableControls } from "./draggable-controls";
import { useState } from "react";

interface DraggableOverlayProps {
  stamps: Stamp[];
  draggedStamp: string | null;
  handleDragStart: (stampId: string) => void;
  handleDragEnd: (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
    stampId: string
  ) => void;
  previewRef: React.RefObject<HTMLDivElement | null>;
  onUpdateStamp: (stampId: string, updates: Partial<Stamp>) => void;
  onRemoveStamp: (stampId: string) => void;
}

export function DraggableOverlay({
  stamps,
  draggedStamp,
  handleDragStart,
  handleDragEnd,
  previewRef,
  onUpdateStamp,
  onRemoveStamp,
}: DraggableOverlayProps) {
  const { uploadedImages, updateImage, removeImage } = useCodeGeneratorStore();
  const [selectedElement, setSelectedElement] = useState<string | null>(null);

  const handleImageDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
    imageId: string
  ) => {
    if (!previewRef.current) return;

    const container = previewRef.current.querySelector(".syntax-highlighter");
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const image = uploadedImages.find((img) => img.id === imageId);
    if (!image) return;

    // Calculate new coordinates
    let newX = image.x + info.offset.x;
    let newY = image.y + info.offset.y;

    // Limit coordinates within the preview area
    newX = Math.max(0, Math.min(newX, rect.width));
    newY = Math.max(0, Math.min(newY, rect.height));

    updateImage(imageId, {
      x: newX,
      y: newY,
    });
  };

  const handleImageControls = (imageId: string) => {
    const image = uploadedImages.find((img) => img.id === imageId);
    const container = previewRef.current?.querySelector(".syntax-highlighter");
    if (!image || !container) {
      const noop = () => {};
      return {
        onRotateLeft: noop,
        onRotateRight: noop,
        onZoomIn: noop,
        onZoomOut: noop,
        onOpacityIncrease: noop,
        onOpacityDecrease: noop,
        onDelete: noop,
        onResetRotation: noop,
        onResetScale: noop,
        onResetOpacity: noop,
        onAlignLeft: noop,
        onAlignCenter: noop,
        onAlignRight: noop,
        onAlignTop: noop,
        onAlignMiddle: noop,
        onAlignBottom: noop,
        onBrightnessIncrease: noop,
        onBrightnessDecrease: noop,
        onContrastIncrease: noop,
        onContrastDecrease: noop,
        onSaturationIncrease: noop,
        onSaturationDecrease: noop,
        onExposureIncrease: noop,
        onExposureDecrease: noop,
        onHueIncrease: noop,
        onHueDecrease: noop,
        onResetAdjustments: noop,
      };
    }

    const rect = container.getBoundingClientRect();

    return {
      onRotateLeft: () => {
        updateImage(imageId, {
          rotation: (image.rotation - 45) % 360,
        });
      },
      onRotateRight: () => {
        updateImage(imageId, {
          rotation: (image.rotation + 45) % 360,
        });
      },
      onZoomIn: () => {
        updateImage(imageId, {
          scale: image.scale + 0.1,
        });
      },
      onZoomOut: () => {
        updateImage(imageId, {
          scale: Math.max(image.scale - 0.1, 0.1),
        });
      },
      onOpacityIncrease: () => {
        updateImage(imageId, {
          opacity: Math.min(image.opacity + 0.1, 1),
        });
      },
      onOpacityDecrease: () => {
        updateImage(imageId, {
          opacity: Math.max(image.opacity - 0.1, 0.1),
        });
      },
      onDelete: () => {
        removeImage(imageId);
        setSelectedElement(null);
      },
      onResetRotation: () => {
        updateImage(imageId, { rotation: 0 });
      },
      onResetScale: () => {
        updateImage(imageId, { scale: 1 });
      },
      onResetOpacity: () => {
        updateImage(imageId, { opacity: 1 });
      },
      onAlignLeft: () => {
        updateImage(imageId, { x: 0 });
      },
      onAlignCenter: () => {
        updateImage(imageId, {
          x: rect.width / 2 - (image.width * image.scale) / 2,
        });
      },
      onAlignRight: () => {
        updateImage(imageId, { x: rect.width - image.width * image.scale });
      },
      onAlignTop: () => {
        updateImage(imageId, { y: 0 });
      },
      onAlignMiddle: () => {
        updateImage(imageId, {
          y: rect.height / 2 - (image.height * image.scale) / 2,
        });
      },
      onAlignBottom: () => {
        updateImage(imageId, { y: rect.height - image.height * image.scale });
      },
      onBrightnessIncrease: () => {
        updateImage(imageId, {
          brightness: Math.min((image.brightness || 1) + 0.1, 2),
        });
      },
      onBrightnessDecrease: () => {
        updateImage(imageId, {
          brightness: Math.max((image.brightness || 1) - 0.1, 0),
        });
      },
      onContrastIncrease: () => {
        updateImage(imageId, {
          contrast: Math.min((image.contrast || 1) + 0.1, 2),
        });
      },
      onContrastDecrease: () => {
        updateImage(imageId, {
          contrast: Math.max((image.contrast || 1) - 0.1, 0),
        });
      },
      onSaturationIncrease: () => {
        updateImage(imageId, {
          saturation: Math.min((image.saturation || 1) + 0.1, 2),
        });
      },
      onSaturationDecrease: () => {
        updateImage(imageId, {
          saturation: Math.max((image.saturation || 1) - 0.1, 0),
        });
      },
      onExposureIncrease: () => {
        updateImage(imageId, {
          exposure: Math.min((image.exposure || 1) + 0.1, 2),
        });
      },
      onExposureDecrease: () => {
        updateImage(imageId, {
          exposure: Math.max((image.exposure || 1) - 0.1, 0),
        });
      },
      onHueIncrease: () => {
        updateImage(imageId, {
          hue: ((image.hue || 0) + 10) % 360,
        });
      },
      onHueDecrease: () => {
        updateImage(imageId, {
          hue: ((image.hue || 0) - 10 + 360) % 360,
        });
      },
      onResetAdjustments: (
        adjustments: Partial<{
          brightness: number;
          contrast: number;
          saturation: number;
          exposure: number;
          hue: number;
        }>
      ) => {
        updateImage(imageId, adjustments);
      },
    };
  };

  const handleStampControls = (stampId: string) => {
    const stamp = stamps.find((s) => s.id === stampId);
    const container = previewRef.current?.querySelector(".syntax-highlighter");
    if (!stamp || !container) {
      const noop = () => {};
      return {
        onRotateLeft: noop,
        onRotateRight: noop,
        onZoomIn: noop,
        onZoomOut: noop,
        onOpacityIncrease: noop,
        onOpacityDecrease: noop,
        onDelete: noop,
        onResetRotation: noop,
        onResetScale: noop,
        onResetOpacity: noop,
        onAlignLeft: noop,
        onAlignCenter: noop,
        onAlignRight: noop,
        onAlignTop: noop,
        onAlignMiddle: noop,
        onAlignBottom: noop,
        onBrightnessIncrease: noop,
        onBrightnessDecrease: noop,
        onContrastIncrease: noop,
        onContrastDecrease: noop,
        onSaturationIncrease: noop,
        onSaturationDecrease: noop,
        onExposureIncrease: noop,
        onExposureDecrease: noop,
        onHueIncrease: noop,
        onHueDecrease: noop,
        onResetAdjustments: noop,
      };
    }

    const rect = container.getBoundingClientRect();

    return {
      onRotateLeft: () => {
        onUpdateStamp(stampId, {
          rotation: (stamp.rotation - 45) % 360,
        });
      },
      onRotateRight: () => {
        onUpdateStamp(stampId, {
          rotation: (stamp.rotation + 45) % 360,
        });
      },
      onZoomIn: () => {
        onUpdateStamp(stampId, {
          scale: stamp.scale + 0.1,
        });
      },
      onZoomOut: () => {
        onUpdateStamp(stampId, {
          scale: Math.max(stamp.scale - 0.1, 0.1),
        });
      },
      onOpacityIncrease: () => {
        onUpdateStamp(stampId, {
          opacity: Math.min(stamp.opacity + 0.1, 1),
        });
      },
      onOpacityDecrease: () => {
        onUpdateStamp(stampId, {
          opacity: Math.max(stamp.opacity - 0.1, 0.1),
        });
      },
      onDelete: () => {
        onRemoveStamp(stampId);
        setSelectedElement(null);
      },
      onResetRotation: () => {
        onUpdateStamp(stampId, { rotation: 0 });
      },
      onResetScale: () => {
        onUpdateStamp(stampId, { scale: 1 });
      },
      onResetOpacity: () => {
        onUpdateStamp(stampId, { opacity: 1 });
      },
      onAlignLeft: () => {
        onUpdateStamp(stampId, { x: 0 });
      },
      onAlignCenter: () => {
        onUpdateStamp(stampId, {
          x: rect.width / 2,
        });
      },
      onAlignRight: () => {
        onUpdateStamp(stampId, { x: rect.width });
      },
      onAlignTop: () => {
        onUpdateStamp(stampId, { y: 0 });
      },
      onAlignMiddle: () => {
        onUpdateStamp(stampId, {
          y: rect.height / 2,
        });
      },
      onAlignBottom: () => {
        onUpdateStamp(stampId, { y: rect.height });
      },
      onBrightnessIncrease: () => {
        onUpdateStamp(stampId, {
          brightness: Math.min((stamp.brightness || 1) + 0.1, 2),
        });
      },
      onBrightnessDecrease: () => {
        onUpdateStamp(stampId, {
          brightness: Math.max((stamp.brightness || 1) - 0.1, 0),
        });
      },
      onContrastIncrease: () => {
        onUpdateStamp(stampId, {
          contrast: Math.min((stamp.contrast || 1) + 0.1, 2),
        });
      },
      onContrastDecrease: () => {
        onUpdateStamp(stampId, {
          contrast: Math.max((stamp.contrast || 1) - 0.1, 0),
        });
      },
      onSaturationIncrease: () => {
        onUpdateStamp(stampId, {
          saturation: Math.min((stamp.saturation || 1) + 0.1, 2),
        });
      },
      onSaturationDecrease: () => {
        onUpdateStamp(stampId, {
          saturation: Math.max((stamp.saturation || 1) - 0.1, 0),
        });
      },
      onExposureIncrease: () => {
        onUpdateStamp(stampId, {
          exposure: Math.min((stamp.exposure || 1) + 0.1, 2),
        });
      },
      onExposureDecrease: () => {
        onUpdateStamp(stampId, {
          exposure: Math.max((stamp.exposure || 1) - 0.1, 0),
        });
      },
      onHueIncrease: () => {
        onUpdateStamp(stampId, {
          hue: ((stamp.hue || 0) + 10) % 360,
        });
      },
      onHueDecrease: () => {
        onUpdateStamp(stampId, {
          hue: ((stamp.hue || 0) - 10 + 360) % 360,
        });
      },
      onResetAdjustments: (
        adjustments: Partial<{
          brightness: number;
          contrast: number;
          saturation: number;
          exposure: number;
          hue: number;
        }>
      ) => {
        onUpdateStamp(stampId, adjustments);
      },
    };
  };

  return (
    <div
      className="absolute inset-0 cursor-crosshair"
      onClick={() => setSelectedElement(null)}
    >
      {/* Uploaded Images */}
      {uploadedImages.map((image) => (
        <motion.div
          key={image.id}
          className="absolute top-0 left-0 cursor-move group"
          drag
          dragMomentum={false}
          initial={false}
          animate={{ x: image.x, y: image.y }}
          onDragEnd={(e, info) => handleImageDragEnd(e, info, image.id)}
          whileDrag={{ scale: 1.02, zIndex: 50 }}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedElement(image.id);
          }}
        >
          <div className="relative">
            <div
              className="max-w-[80%] max-h-[80%]"
              style={{
                transform: `rotate(${image.rotation}deg) scale(${image.scale})`,
                opacity: image.opacity,
                filter: `
                  brightness(${image.brightness})
                  contrast(${image.contrast})
                  saturate(${image.saturation})
                  brightness(${image.exposure})
                  hue-rotate(${image.hue}deg)
                `,
              }}
            >
              <Image
                src={image.url}
                alt="Code background"
                className="object-contain select-none"
                width={image.width}
                height={image.height}
                unoptimized
                draggable={false}
                data-image-id={image.id}
              />
            </div>
          </div>
          {selectedElement === image.id && (
            <div
              className="absolute left-1/2 -translate-x-1/2 z-[100]"
              style={{ top: "-3rem" }}
            >
              <DraggableControls {...handleImageControls(image.id)} />
            </div>
          )}
        </motion.div>
      ))}

      {/* Stamps */}
      {stamps.map((stamp) => (
        <motion.div
          key={stamp.id}
          drag
          dragMomentum={false}
          onDragStart={() => handleDragStart(stamp.id)}
          onDragEnd={(e, info) => handleDragEnd(e, info, stamp.id)}
          initial={false}
          animate={{ x: stamp.x, y: stamp.y }}
          whileDrag={{ scale: 1.1, zIndex: 50 }}
          className={cn(
            "absolute top-0 left-0 cursor-grab active:cursor-grabbing",
            draggedStamp === stamp.id && "z-50"
          )}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedElement(stamp.id);
          }}
        >
          <div
            style={{
              transform: `rotate(${stamp.rotation}deg) scale(${stamp.scale})`,
              opacity: stamp.opacity,
              filter: `
                brightness(${stamp.brightness || 1})
                contrast(${stamp.contrast || 1})
                saturate(${stamp.saturation || 1})
                brightness(${stamp.exposure || 1})
                hue-rotate(${stamp.hue || 0}deg)
              `,
            }}
          >
            {stamp.icon}
          </div>
          {selectedElement === stamp.id && (
            <div
              className="absolute left-1/2 -translate-x-1/2 z-[100]"
              style={{ top: "-3rem" }}
            >
              <DraggableControls {...handleStampControls(stamp.id)} />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
