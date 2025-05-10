'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CarpetAnimationProps {
  children: ReactNode;
}

export default function CarpetAnimation({ children }: CarpetAnimationProps) {
  return (
    <motion.div 
      initial={{ scale: 0, rotate: -45, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="absolute bottom-0 left-0 w-2/3 h-96 bg-primary origin-bottom-left"
    >
      {children}
    </motion.div>
  );
} 