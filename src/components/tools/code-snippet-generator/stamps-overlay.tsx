"use client";

import { motion } from "framer-motion";
import type { PanInfo } from "framer-motion";
import { cn } from "@/lib/utils";
import { Stamp } from "./types";

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

export function StampsOverlay({
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
