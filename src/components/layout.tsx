import Head from 'next/head';
import * as React from 'react';
import { Header } from './header';
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>DeFi Health Service</title>
      </Head>
      <Header />
      {children}
    </>
  );
}
