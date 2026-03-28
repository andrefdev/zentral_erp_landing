"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  speed?: number;
  direction?: "left" | "right";
  className?: string;
  pauseOnHover?: boolean;
}

export function Marquee({
  children,
  speed = 30,
  direction = "left",
  className = "",
  pauseOnHover = true,
}: MarqueeProps) {
  const directionMultiplier = direction === "left" ? -1 : 1;

  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{ maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}
    >
      <motion.div
        className={`flex gap-8 w-max ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""}`}
        animate={{ x: [0, directionMultiplier * -1920] }}
        transition={{
          x: {
            duration: speed,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          },
        }}
      >
        {children}
        {children}
        {children}
      </motion.div>
    </div>
  );
}
