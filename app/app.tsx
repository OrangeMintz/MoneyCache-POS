import Navbar from '@/app/comps/header';
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
  // Define routes where header should be hidden
  const noHeaderRoutes = ['/login', '/forgot-password'];
  const showHeader = !noHeaderRoutes.includes(router.pathname);

  return (
    <>
      {showHeader && (
        <header>
         <Navbar />
        </header>
      )}
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}