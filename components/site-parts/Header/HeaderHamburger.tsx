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
  const dialogRef = useRef<HTMLDialogElement>(null);

  // ページ遷移を検知
  useEffect(() => {
    closeDialog();
  }, [pathname]);

  const openDialog = () => {
    dialogRef.current?.showModal();
  };
  const closeDialog = () => {
    dialogRef.current?.close();
  };

  const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) {
      closeDialog();
    }
  };

  return (
    <div className="lg:hidden">
      <dialog
        aria-label="メニュー"
        ref={dialogRef}
        className="relative  backdrop:bg-slate-700 backdrop:opacity-60 lg:hidden"
        onClick={handleDialogClick}
      >
        <div className="p-16">
          <button
            type="button"
            aria-label="メニューを閉じる"
            className="absolute right-3  top-0 p-2"
            onClick={closeDialog}
          >
            <span aria-hidden="true" className="text-3xl">
              ×
            </span>
          </button>
          <nav className="flex flex-col gap-6">
            {pages.map((page) => (
              <Link key={page.id} href={`/${page.slug}/`} className="py-1 hover:underline focus-visible:underline">
                {page.title}
              </Link>
            ))}
          </nav>
        </div>
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
