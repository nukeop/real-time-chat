'use client';

import {
  Bars3Icon,
  Cog6ToothIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { FC, useState } from 'react';

import { SidebarItem } from './SidebarItem';

type SidebarProps = {};

export const Sidebar: FC<SidebarProps> = () => {
  const [isOpen, setOpen] = useState(false);
  const onToggle = () => setOpen(!isOpen);
  const pathname = usePathname();

  const items = [
    {
      icon: <HomeIcon className="h-5" />,
      label: 'Home',
      path: '/',
      isActive: false,
      onClick: () => {},
    },
    {
      label: 'Settings',
      icon: <Cog6ToothIcon className="h-5" />,
      isActive: false,
      path: '/settings',
      onClick: () => {},
    },
  ].map((item) => ({
    ...item,
    isActive: pathname === item.path.toLowerCase(),
  }));

  return (
    <motion.aside
      className="flex h-full flex-col items-center bg-gray-950 p-2"
      initial={{ width: '3.5rem' }}
      animate={{ width: isOpen ? '14rem' : '3.5rem' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <motion.button
        className="-ml-2 mb-4 flex h-8 w-full cursor-pointer flex-row items-center rounded hover:bg-gray-800"
        whileTap={{ scale: 0.95 }}
        onClick={onToggle}
      >
        <span className="flex h-full w-10 min-w-10 flex-row items-center justify-start overflow-hidden">
          <span className="flex h-full w-10 items-center justify-center">
            <Bars3Icon className="h-5" />
          </span>
        </span>
        <motion.span
          initial={{ opacity: 0, width: 0 }}
          animate={
            isOpen ? { opacity: 1, width: 'auto' } : { opacity: 0, width: 0 }
          }
          exit={{ opacity: 0, width: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden whitespace-nowrap"
        >
          {isOpen ? 'Close' : 'Open'}
        </motion.span>
      </motion.button>
      <div className="flex w-full flex-1 flex-col gap-1">
        {items.map((item, index) => (
          <SidebarItem key={index} {...item} isOpen={isOpen} />
        ))}
      </div>
    </motion.aside>
  );
};
