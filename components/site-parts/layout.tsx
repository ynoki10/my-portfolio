import { ComponentPropsWithoutRef } from 'react';

import Footer from '@/components/site-parts/footer';
import Header from '@/components/site-parts/header';

type Props = ComponentPropsWithoutRef<typeof Header> & {
  children: React.ReactNode;
};

const Layout = ({ pages, children }: Props) => {
  return (
    <div className={'flex min-h-screen flex-col'}>
      <Header pages={pages} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
