'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

type Props = {
  id: string;
  slug: string;
  title: string;
};

const HeaderLink = ({ id, slug, title }: Props) => {
  const pathname = usePathname();
  const isCurrentPage = pathname === `/${slug}`;

  return (
    <Link
      key={id}
      className={cn(
        'text-sm font-medium underline-offset-8',
        isCurrentPage && 'underline',
        !isCurrentPage && 'hover:underline',
      )}
      href={`/${slug}/`}
    >
      {title}
    </Link>
  );
};

export default HeaderLink;
