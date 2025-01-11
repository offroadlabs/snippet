"use client";

import { motion, AnimatePresence } from "framer-motion";

interface CaptureOverlayProps {
  isCapturing: boolean;
}

export function CaptureOverlay({ isCapturing }: CaptureOverlayProps) {
  return (
    <AnimatePresence>
      {isCapturing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-white/30 backdrop-blur-sm rounded-xl z-10"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", damping: 15 }}
              className="bg-background/90 backdrop-blur-sm text-foreground px-4 py-2 rounded-lg shadow-lg"
            >
              Capturing...
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
