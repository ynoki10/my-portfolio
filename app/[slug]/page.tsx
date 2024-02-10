import NormalPage from '@/components/pages/normalPage';
import ProjectPage from '@/components/pages/projectPage';

import { client } from '@/lib/microcms-client';
import { PagesContent, SettingsResponse } from '@/types/apiResponse';

export async function generateStaticParams() {
  const pages = (await client.getList<PagesContent>({ endpoint: 'pages' })).contents;

  const paths = pages.map((page) => {
    return { slug: page.slug };
  });

  return paths;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const pages = (await client.getList<PagesContent>({ endpoint: 'pages' })).contents;
  const page = pages.find((p) => p.slug === slug);
  if (!page) {
    return {
      notFound: true,
    };
  }

  const projectPage = await client.getObject<SettingsResponse>({ endpoint: 'settings' }).then((res) => res.projectPage);

  const isProjectPage = page.slug === projectPage.slug;

  if (isProjectPage) {
    const projects = (await client.getList({ endpoint: 'projects' })).contents;
    return <ProjectPage page={page} projects={projects} />;
  } else {
    return <NormalPage page={page} />;
  }
}
