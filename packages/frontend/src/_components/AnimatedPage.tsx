'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { FC, ReactNode } from 'react';

export const AnimatedPage: FC<{ children: ReactNode }> = ({ children }) => (
  <AnimatePresence mode="wait">
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex h-auto w-full flex-row gap-4 bg-transparent text-white"
    >
      {children}
    </motion.main>
  </AnimatePresence>
);
