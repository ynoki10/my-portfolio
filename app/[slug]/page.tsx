import { ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

import Image from '@/components/ui/Image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import { genMetadata } from '@/app/metadata';
import { getPages } from '@/lib/microcms-client';

export const generateMetadata = async (
  {
    params,
  }: {
    params: { slug: string };
  },
  parent: ResolvingMetadata,
) => {
  const slug = params.slug;
  const pages = await getPages();
  const page = pages.contents.find((p) => p.slug === slug);
  if (!page) throw new Error(`Page not found for slug: ${slug}`);

  return genMetadata({
    title: page.title,
    description: page.description,
    parent,
  });
};

export async function generateStaticParams() {
  const pages = await getPages();
  const paths = pages.contents.map((page) => {
    return { slug: page.slug };
  });
  return paths;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const pages = await getPages();
  const page = pages.contents.find((p) => p.slug === slug);
  if (!page) notFound();

  return (
    <article className="space-y-10">
      <h1 className="text-3xl font-bold tracking-tighter">{page.title}</h1>
      {page.slug === 'profile' && (
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
      <div className="prose prose-slate">
        <div dangerouslySetInnerHTML={{ __html: page.body }}></div>
        {page.accordions &&
          page.accordions.map((accordion) => {
            return (
              <Accordion type="single" key={accordion.title} collapsible>
                <AccordionItem value={accordion.title}>
                  <AccordionTrigger>{accordion.title}</AccordionTrigger>
                  <AccordionContent>
                    <div dangerouslySetInnerHTML={{ __html: accordion.body }}></div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          })}
      </div>
    </article>
  );
}
