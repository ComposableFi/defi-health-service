import 'windi.css';
import '@/styles/globals.css';
import { Layout } from '@/components/layout';

import { SessionProvider } from 'next-auth/react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || (page => page);
  return (
    <SessionProvider session={session} refetchInterval={0}>
      <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
    </SessionProvider>
  );
}
