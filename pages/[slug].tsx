import Layout from '@/components/site-parts/layout';

import { client } from '@/lib/microcms-client';
import { PagesContent, SettingsResponse } from '@/types/apiResponse';
type Props = {
  pages: PagesContent[];
  page: PagesContent;
};

export default function Page({ pages, page }: Props) {
  return (
    <Layout pages={pages}>
      <section className="w-full py-12 sm:py-24 md:py-32 lg:py-48">
        <div className="container px-4 md:px-6">
          <div className="space-y-4">
            <div className="space-y-6">
              <h1 className="text-3xl font-bold tracking-tighter">{page.title}</h1>
              <div className="space-y-2" dangerouslySetInnerHTML={{ __html: page.body }}></div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  const pages = await client.getList<PagesContent>({ endpoint: 'pages' });
  const projectPage = await client.getObject<SettingsResponse>({ endpoint: 'settings' }).then((res) => res.projectPage);

  const paths = pages.contents
    .filter((page) => page.id !== projectPage.id)
    .map((page) => ({
      params: { slug: page.slug },
    }));

  return { paths, fallback: false };
}

export async function getStaticProps(context: { params: { slug: string } }) {
  const pages = await client.getList<PagesContent>({ endpoint: 'pages' });
  const page = pages.contents.find((p) => p.slug === context.params.slug);

  return {
    props: {
      pages: pages.contents,
      page,
    },
  };
}
