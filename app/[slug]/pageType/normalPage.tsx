import Image from 'next/image';

import { getPage } from '@/lib/microcms-client';

type Props = {
  id: string;
};

const NormalPage = async ({ id }: Props) => {
  const page = await getPage(id);

  return (
    <article className="space-y-10">
      <h1 className="text-3xl font-bold tracking-tighter">{page.title}</h1>
      {page.slug === 'about' && (
        <div className="flex flex-col items-center gap-y-4">
          <Image
            alt="プロフィール画像：はっきりとした線で描かれたポップなイラスト。男性が前方を見上げて口角を上げている。空をイメージした青い背景。"
            className="size-48 rounded-full"
            height={192}
            src="/images/icon.webp"
            width={192}
          />
          <p className="text-2xl font-bold">Yoshinoki</p>
          <ul className="flex space-x-4">
            {[
              {
                href: 'https://github.com/ynoki10',
                text: 'GitHub',
              },
              {
                href: 'https://twitter.com/4noki10',
                text: 'Twitter(X)',
              },
              {
                href: 'https://www.yoshinoki.dev/',
                text: 'Blog',
              },
              {
                href: 'https://zenn.dev/yoshinoki',
                text: 'Zenn',
              },
            ].map(({ href, text }) => (
              <li key={text}>
                <a className="text-indigo-800 underline" href={href} target="_blank">
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="prose space-y-2" dangerouslySetInnerHTML={{ __html: page.body }}></div>
    </article>
  );
};

export default NormalPage;
