import { UserCircleIcon } from '@heroicons/react/20/solid';
import { motion } from 'framer-motion';
import { FC, useState } from 'react';
import { useUserProfile } from '../../hooks/useUserProfile';
import { DropdownMenu } from '../DropdownMenu/DropdownMenu';

const dropdownData = [
  { id: 1, label: 'Profile', onClick: () => alert('Profile clicked') },
  { id: 2, label: 'Settings', onClick: () => alert('Settings clicked') },
  { id: 3, label: 'Logout', onClick: () => alert('Logout clicked') },
];

export const UserMenu: FC = () => {
  const { username, setUsername } = useUserProfile();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <DropdownMenu
      label={
        <>
          <UserCircleIcon className="h-4 w-4" />
          <span className="ml-2 text-xs">{username ?? 'No username'}</span>
        </>
      }
      items={[
        {
          id: '1',
          label: 'Change username',
          onClick: () => setUsername('New username'),
          value: 'Change username',
        },
      ]}
    />
  );
};
