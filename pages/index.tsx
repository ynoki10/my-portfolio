import Link from 'next/link';

import Layout from '@/components/site-parts/layout';
import { Button } from '@/components/ui/button';

import { client } from '@/lib/microcms-client';
import { PagesContent } from '@/types/apiResponse';

type Props = {
  pages: PagesContent[];
};

export default function Home({ pages }: Props) {
  return (
    <Layout pages={pages}>
      <section className="w-full py-12 sm:py-24 md:py-32 lg:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Hi, I&apos;m Yoshinoki 🦊
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                Markup & Front-end Engineer
              </p>
            </div>
            <div className="space-x-4">
              <Button size="lg" asChild>
                <Link href="#">About Me</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#">View Projects</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const pages = await client.getList<PagesContent>({ endpoint: 'pages' });

  return {
    props: {
      pages: pages.contents,
    },
  };
}
