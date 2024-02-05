import { InferGetStaticPropsType } from 'next';

import NormalPage from '@/components/pages/normalPage';
import ProjectPage from '@/components/pages/projectPage';
import Layout from '@/components/site-parts/layout';

import { client } from '@/lib/microcms-client';
import { PagesContent, ProjectsContent, SettingsResponse } from '@/types/apiResponse';

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Page({ pages, page, isProjectPage, projects }: PageProps) {
  return (
    <Layout pages={pages}>
      {isProjectPage ? <ProjectPage page={page} projects={projects} /> : <NormalPage page={page} />}
    </Layout>
  );
}

export async function getStaticPaths() {
  const pages = await client.getList<PagesContent>({ endpoint: 'pages' });

  const paths = pages.contents.map((page) => ({
    params: { slug: page.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps(context: { params: { slug: string } }) {
  const pages = await client.getList<PagesContent>({ endpoint: 'pages' });
  const page = pages.contents.find((p) => p.slug === context.params.slug);
  if (!page) {
    return {
      notFound: true,
    };
  }

  const projectPage = await client.getObject<SettingsResponse>({ endpoint: 'settings' }).then((res) => res.projectPage);

  const isProjectPage = page.slug === projectPage.slug;

  if (isProjectPage) {
    const projects = await client.getList<ProjectsContent>({ endpoint: 'projects' });
    return {
      props: {
        pages: pages.contents,
        page,
        isProjectPage,
        projects: projects.contents,
      },
    };
  } else {
    return {
      props: {
        pages: pages.contents,
        page,
        isProjectPage,
      },
    };
  }
}
