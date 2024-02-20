import { ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

import ProfileHeader from '@/components/site-parts/ProfileHeader';
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
  if (!page) return null;

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
      {page.slug === 'profile' && <ProfileHeader />}
      <div className="prose prose-slate">
        <div dangerouslySetInnerHTML={{ __html: page.body }}></div>
        {page.accordions &&
          page.accordions.map((accordion) => {
            return (
              <Accordion type="single" key={accordion.title} collapsible>
                <AccordionItem value={accordion.title} className="prose-h3:mb-0 prose-h3:mt-1">
                  <AccordionTrigger>{accordion.title}</AccordionTrigger>
                  <AccordionContent>
                    <div className="*:first:mt-0" dangerouslySetInnerHTML={{ __html: accordion.body }}></div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          })}
      </div>
    </article>
  );
}
