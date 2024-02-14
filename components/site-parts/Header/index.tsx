import HeaderHamburger from '@/components/site-parts/Header/HeaderHamburger';
import HeaderLink from '@/components/site-parts/Header/headerLink';
import HeaderLogo from '@/components/site-parts/Header/headerLogo';

import { getPages } from '@/lib/microcms-client';

const Header = async () => {
  const pages = await getPages();

  return (
    <header className="flex h-14 items-center justify-between px-4 lg:px-6">
      <HeaderLogo />
      <nav className="ml-auto hidden gap-4 sm:gap-6 lg:flex ">
        {pages.contents.map((page) => (
          <HeaderLink key={page.id} id={page.id} slug={page.slug} title={page.title} />
        ))}
      </nav>
      <HeaderHamburger pages={pages.contents} />
    </header>
  );
};

export default Header;
