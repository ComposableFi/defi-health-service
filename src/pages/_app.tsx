import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ClientContext } from 'graphql-hooks';
import { SessionProvider } from 'next-auth/react';

import 'windi.css';
import '@/styles/globals.css';
import { Layout } from '@/components/layout';
import { useGraphQLClient } from '@/lib/graphql';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const graphQLClient = useGraphQLClient(pageProps.initialGraphQLState);
  const getLayout = Component.getLayout || (page => page);

  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <ClientContext.Provider value={graphQLClient}>
        <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
      </ClientContext.Provider>
    </SessionProvider>
  );
}
