'use client';

import { cn } from "@/app/_lib";
import { motion, useInView } from "framer-motion";
import * as React from "react";

interface LogoAnimationProps {
  children: React.ReactNode;
  index: number;
  className?: string;
}

export function LogoAnimation({ children, index, className = "" }: LogoAnimationProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { 
    once: true,
    margin: "0px 0px -100px 0px"
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.2 }
      }}
      className={cn("relative", className)}
    >
      {children}
    </motion.div>
  );
} 