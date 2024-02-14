'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import siteMetadata from '@/data/siteMetadata';

const HeaderLogo = () => {
  const pathname = usePathname();
  const isTopPage = pathname === '/';
  const title = siteMetadata.title;

  return (
    <Link className="flex items-center justify-center font-bold" href="/">
      {isTopPage ? <h1>{title}</h1> : <p>{title}</p>}
    </Link>
  );
};

export default HeaderLogo;
