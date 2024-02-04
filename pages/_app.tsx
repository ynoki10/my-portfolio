import Footer from '@/components/site-parts/footer';
import Header from '@/components/site-parts/header';

import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={'flex min-h-screen flex-col'}>
      <Header />
      <main className="flex-1">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}
