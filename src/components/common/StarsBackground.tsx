"use client";

import { motion } from "motion/react";

const stars = [
  { left: "8%", top: "10%" },
  { left: "18%", top: "28%" },
  { left: "30%", top: "15%" },
  { left: "42%", top: "40%" },
  { left: "58%", top: "12%" },
  { left: "70%", top: "35%" },
  { left: "82%", top: "18%" },
  { left: "92%", top: "48%" },
  { left: "15%", top: "70%" },
  { left: "35%", top: "82%" },
  { left: "62%", top: "75%" },
  { left: "86%", top: "88%" },
];

export default function StarsBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((star, index) => (
        <motion.div
          key={index}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2 + index * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute h-1 w-1 rounded-full bg-white"
          style={{
            left: star.left,
            top: star.top,
          }}
        />
      ))}
    </div>
  );
}