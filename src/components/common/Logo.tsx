"use client";
import { motion } from "motion/react";

export default function Logo() {
  return (
    <motion.div
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{
    delay: 0.2,
    duration: 0.6,
  }}
  className="fixed left-10 top-10 z-50"
>
 <div className="fixed left-10 top-10 z-50">
        <h1 className="text-3xl font-extrabold tracking-tight">
        <span className="text-white">land</span>
        <span className="text-violet-500">X</span>
      </h1>
    </div>
</motion.div>

  );
}