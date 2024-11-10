'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { FC, ReactElement } from 'react';

export type SidebarItemProps = {
  icon: ReactElement;
  label: string;
  path: string;
  isOpen: boolean;
  isActive: boolean;
  onClick: () => void;
};

export const SidebarItem: FC<SidebarItemProps> = ({
  icon,
  label,
  path,
  isOpen,
  isActive,
  onClick,
}) => {
  return (
    <Link href={path}>
      <motion.div
        className={clsx(
          '-ml-1 flex h-8 w-full cursor-pointer flex-row items-center rounded text-gray-400 transition-colors duration-200 hover:bg-gray-800',
          { 'bg-gray-700 text-white': isActive },
        )}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
      >
        <div className="flex w-10 items-center justify-center">{icon}</div>
        <AnimatePresence>
          {isOpen && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="ml-3 overflow-hidden whitespace-nowrap"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </Link>
  );
};
