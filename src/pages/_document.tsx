import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    return await Document.getInitialProps(ctx);
  }

  render() {
    return (
      <Html lang="en" className="dark">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="annonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@100;400;700&family=Inter:wght@200;400;900&family=JetBrains+Mono:wght@200;400;800&display=swap"
            rel="stylesheet"
          />
          <link href="/favicon.ico" rel="shortcut icon" />
          <meta charSet="utf-8" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="robots" content="follow, index" />
          <meta name="applicable-device" content="pc,mobile" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
          <meta name="theme-color" content="#f7f7f7" media="(prefers-color-scheme: light)" />
          <meta content="max-snippet:-1, max-image-preview:large, max-video-preview:-1" name="robots" />
          <meta name="description" content="Gets and Sets bridge health statuses" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <body className="bg-white dark:bg-[#06020d] text-black dark:text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
