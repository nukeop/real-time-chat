import type { Metadata } from 'next';

import { AnimatedPage } from '../_components/AnimatedPage';
import { ConnectionStatus } from '../_components/ConnectionStatus/ConnectionStatus';
import { Sidebar } from '../_components/Sidebar/Sidebar';
import { StatusBar } from '../_components/StatusBar/StatusBar';
import { UserMenu } from '../_components/UserMenu/UserMenu';
import { Providers } from './providers';

import './index.scss';

export const metadata: Metadata = {};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <StatusBar>
            <ConnectionStatus />
            <UserMenu />
          </StatusBar>
          <main className="flex w-full flex-row px-2 pt-16">
            <Sidebar />
            <div className="relative flex max-h-full w-full flex-row items-start justify-center">
              <AnimatedPage>{children}</AnimatedPage>
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
