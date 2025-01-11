"use client";

import { motion } from "framer-motion";
import { CodeSnippetGenerator } from "@/components/tools/code-snippet-generator";

const containerAnimation = {
  initial: {
    opacity: 0,
    y: 40,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.4,
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export function AnimatedGenerator() {
  return (
    <motion.div
      variants={containerAnimation}
      initial="initial"
      animate="animate"
      className="flex justify-center w-full"
    >
      <CodeSnippetGenerator />
    </motion.div>
  );
}
