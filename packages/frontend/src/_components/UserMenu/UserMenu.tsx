'use client';

import { UserCircleIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { useUserProfile } from '../../_hooks/useUserProfile';
import { DropdownMenu } from '../DropdownMenu/DropdownMenu';

export const UserMenu: FC = () => {
  const { username } = useUserProfile();
  const { push } = useRouter();

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
          onClick: () => push('/settings'),
          value: 'Settings',
        },
      ]}
    />
  );
};
