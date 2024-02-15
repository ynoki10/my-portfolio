'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

import Link from '@/components/ui/Link';

type Props = {
  pages: {
    id: string;
    title: string;
    slug: string;
  }[];
};

const HeaderHamburger = ({ pages }: Props) => {
  const pathname = usePathname();

  // ページ遷移を検知
  useEffect(() => {
    closeDialog();
  }, [pathname]);

  const dialogRef = useRef<HTMLDialogElement>(null);

  const openDialog = () => {
    dialogRef.current?.showModal();
  };
  const closeDialog = () => {
    dialogRef.current?.close();
  };

  return (
    <div className="lg:hidden">
      <dialog aria-label="メニュー" ref={dialogRef} className="relative p-10">
        <button
          type="button"
          aria-label="メニューを閉じる"
          className="absolute right-1  top-0 p-2"
          onClick={closeDialog}
        >
          <span aria-hidden="true" className="text-3xl">
            ×
          </span>
        </button>
        <nav className="flex flex-col gap-4">
          {pages.map((page) => (
            <Link key={page.id} href={`/${page.slug}/`}>
              {page.title}
            </Link>
          ))}
        </nav>
      </dialog>
      <button type="button" aria-label="メニューを開く" className="p-2" onClick={openDialog}>
        <span aria-hidden="true" className="text-3xl">
          =
        </span>
      </button>
    </div>
  );
};

export default HeaderHamburger;
