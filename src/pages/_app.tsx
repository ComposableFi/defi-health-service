import 'windi.css'
import '@/styles/globals.css';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || (page => page);
  return (
    <>
      <Head>
        <title>DeFi Health Service</title>
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}
