import { SessionProvider } from 'next-auth/react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ClientContext } from 'graphql-hooks';
import { useGraphQLClient } from '@/lib/graphql';

import 'windi.css';
import '@/styles/globals.css';
import { Layout } from '@/components/layout';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const graphQLClient = useGraphQLClient(pageProps.initialGraphQLState);
  const getLayout = Component.getLayout || (page => page);
  return (
    <SessionProvider session={session} refetchInterval={0}>
      <ClientContext.Provider value={graphQLClient}>
        <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
      </ClientContext.Provider>
    </SessionProvider>
  );
}
