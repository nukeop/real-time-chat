import type { Metadata } from 'next';
import { ConnectionStatus } from '../components/ConnectionStatus/ConnectionStatus';
import { StatusBar } from '../components/StatusBar/StatusBar';
import { UserMenu } from '../components/UserMenu/UserMenu';
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
          <div className="relative flex max-h-full w-full max-w-screen-lg flex-row items-start justify-center pt-16">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
