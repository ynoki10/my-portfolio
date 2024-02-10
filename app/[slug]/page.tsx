import { notFound } from 'next/navigation';

import NormalPage from '@/app/[slug]/pageType/normalPage';
import ProjectPage from '@/app/[slug]/pageType/projectPage';
import { getPages, getSettings } from '@/lib/microcms-client';

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

  const settings = await getSettings();
  const isProjectPage = page.slug === settings.projectPage.slug;

  return isProjectPage ? <ProjectPage id={page.id} /> : <NormalPage id={page.id} />;
}
