"use client";

import { motion } from "framer-motion";

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeIn = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function AnimatedHero() {
  return (
    <motion.div
      variants={stagger}
      initial="initial"
      animate="animate"
      className="max-w-3xl mx-auto text-center mb-16 space-y-4"
    >
      <motion.h1
        variants={fadeIn}
        className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[rgba(158,195,58,1)] via-[rgba(36,135,199,1)] to-[rgba(158,195,58,1)] animate-gradient-x"
      >
        Code Snippet Generator
      </motion.h1>
      <motion.p variants={fadeIn} className="text-lg">
        <span className="text-primary">Create beautiful code snippets</span>{" "}
        <span className="text-secondary">for your social media in seconds</span>
      </motion.p>
    </motion.div>
  );
}
