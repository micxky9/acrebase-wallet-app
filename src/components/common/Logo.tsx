"use client";

import { motion } from "motion/react";

export default function Logo() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -20,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.6,
        delay: 0.2,
      }}
      className="absolute left-10 top-10 z-20"
    >
      {/* Your existing logo goes here */}
    </motion.div>
  );
}