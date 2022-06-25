import * as React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import { CogIcon, TableIcon, PlusIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';

import { MobileMenu } from './mobile-menu';
import { Sidebar } from './sidebar';
import { Header } from './header';
import type { Navigation } from '@/types';

const sidebarNavigation: ReadonlyArray<Navigation> = [
  { name: 'Dashboard', href: '/', icon: TableIcon },
  { name: 'Add New', href: '/new-service', icon: PlusIcon },
  { name: 'Settings', href: '/settings', icon: CogIcon },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const router = useRouter();
  const { status } = useSession();
  if (status !== 'authenticated') return <>{children}</>;
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>DeFi Health Service</title>
      </Head>
      <div className="h-full flex">
        <Sidebar items={sidebarNavigation} activePage={router.pathname} />
        <MobileMenu
          items={sidebarNavigation}
          activePage={router.pathname}
          open={mobileMenuOpen}
          setOpen={setMobileMenuOpen}
        />
        <div className="flex-1 flex flex-col overflow-hidden mt-3">
          <Header onMenuClick={() => setMobileMenuOpen(true)} />
          {children}
        </div>
      </div>
      <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
    </>
  );
}

export const getLayout = (page: React.ReactNode) => <Layout>{page}</Layout>;
