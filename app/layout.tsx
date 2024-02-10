import '@/styles/globals.css';

import Footer from '@/components/site-parts/footer';
import Header from '@/components/site-parts/header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <div className={'flex min-h-screen flex-col'}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
