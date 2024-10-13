import type { Metadata } from 'next';
import { ConnectionStatus } from '../_components/ConnectionStatus/ConnectionStatus';
import { StatusBar } from '../_components/StatusBar/StatusBar';
import { UserMenu } from '../_components/UserMenu/UserMenu';
import { Providers } from './providers';
import './index.scss';
import { AnimatedPage } from '../_components/AnimatedPage';

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
            <AnimatedPage>{children}</AnimatedPage>
          </div>
        </Providers>
      </body>
    </html>
  );
}
