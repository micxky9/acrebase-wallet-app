"use client";

import { motion } from "motion/react";

export default function BackgroundGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">

      {/* Center Glow */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.22, 0.3, 0.22],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-1/2
          top-1/2
          h-[650px]
          w-[650px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-violet-600/20
          blur-[150px]
        "
      />

      {/* Top Left */}
      <motion.div
        animate={{
          x: [-20, 20, -20],
          y: [-10, 10, -10],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -left-44
          -top-44
          h-[450px]
          w-[450px]
          rounded-full
          bg-fuchsia-600/15
          blur-[140px]
        "
      />

      {/* Bottom Right */}
      <motion.div
        animate={{
          x: [20, -20, 20],
          y: [10, -10, 10],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -bottom-44
          -right-44
          h-[500px]
          w-[500px]
          rounded-full
          bg-indigo-600/15
          blur-[150px]
        "
      />

    </div>
  );
}