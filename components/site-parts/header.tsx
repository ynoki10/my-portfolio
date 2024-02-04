import Link from 'next/link';

const Header = () => {
  return (
    <header className="flex h-14 items-center px-4 lg:px-6">
      <Link className="flex items-center justify-center font-bold" href="/">
        Yoshinoki&apos;s Portfolio
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link className="text-sm font-medium underline-offset-4 hover:underline" href="#">
          About Me
        </Link>
        <Link className="text-sm font-medium underline-offset-4 hover:underline" href="#">
          Skills
        </Link>
        <Link className="text-sm font-medium underline-offset-4 hover:underline" href="#">
          Projects
        </Link>
      </nav>
    </header>
  );
};

export default Header;
