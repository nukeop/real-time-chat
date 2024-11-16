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
      className="mx-0 flex h-auto w-full flex-row gap-4 rounded-md bg-slate-800 p-4 text-white shadow-lg ring-1 ring-slate-700"
    >
      {children}
    </motion.main>
  </AnimatePresence>
);
