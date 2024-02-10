import Link from 'next/link';

import HeaderLink from '@/components/site-parts/Header/headerLink';

import { getPages } from '@/lib/microcms-client';

const Header = async () => {
  const pages = await getPages();

  return (
    <header className="flex h-14 items-center px-4 lg:px-6">
      <Link className="flex items-center justify-center font-bold" href="/">
        Yoshinoki&apos;s Portfolio
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        {pages.contents.map((page) => (
          <HeaderLink key={page.id} id={page.id} slug={page.slug} title={page.title} />
        ))}
      </nav>
    </header>
  );
};

export default Header;
