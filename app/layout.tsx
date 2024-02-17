import '@/styles/globals.css';

import Footer from '@/components/site-parts/Footer';
import Header from '@/components/site-parts/Header';

import siteMetadata from '@/data/siteMetadata';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  alternates: {
    canonical: './',
  },
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    locale: siteMetadata.locale,
    type: 'website',
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    description: siteMetadata.description,
    site: siteMetadata.twitterId,
    creator: siteMetadata.twitterId,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="has-[dialog[open]]:overflow-hidden">
        <div className={'flex min-h-screen flex-col'}>
          <Header />
          <main className="container mx-auto grid max-w-3xl flex-1 items-center px-4 py-24 sm:px-6 md:px-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
