import Link from 'next/link';

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
          <Link
            key={page.id}
            className="text-sm font-medium underline-offset-4 hover:underline"
            href={`/${page.slug}/`}
          >
            {page.title}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
