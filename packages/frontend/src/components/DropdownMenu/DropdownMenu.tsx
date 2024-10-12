import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import React, { ReactElement } from 'react';

type DropdownMenuProps = {
  label: string | ReactElement;
  items: { id: string; value: string; label: string; onClick: () => void }[];
};

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ label, items }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <MenuButton className="inline-flex items-center justify-center rounded-md bg-slate-800 px-2 py-1 text-sm font-medium text-white ring-1 ring-slate-600 hover:bg-slate-800 focus:bg-slate-700 focus:outline-none focus-visible:ring-white focus-visible:ring-opacity-75 active:bg-slate-600">
            {label}
          </MenuButton>
          <AnimatePresence>
            {open && (
              <MenuItems
                as={motion.div}
                static
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-slate-700 rounded-md bg-slate-950 px-1 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                {items.map((item) => (
                  <MenuItem
                    as="button"
                    key={item.id}
                    className="group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-300 data-[active]:bg-indigo-500 data-[active]:text-white"
                    onClick={item.onClick}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </MenuItems>
            )}
          </AnimatePresence>
        </>
      )}
    </Menu>
  );
};
