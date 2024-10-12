import { UserCircleIcon } from '@heroicons/react/20/solid';
import { FC } from 'react';
import { redirect } from 'react-router-dom';
import { useUserProfile } from '../../hooks/useUserProfile';
import { DropdownMenu } from '../DropdownMenu/DropdownMenu';

export const UserMenu: FC = () => {
  const { username, setUsername } = useUserProfile();

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
          label: 'Settings',
          onClick: () => redirect('/settings'),
          value: 'Settings',
        },
      ]}
    />
  );
};
