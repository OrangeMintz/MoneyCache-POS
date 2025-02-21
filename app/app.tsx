import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <script
          src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"
          integrity="sha384-..."
          crossOrigin="anonymous"
          defer
        ></script>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
