import { ExternalLink } from 'lucide-react';
import { ResolvingMetadata } from 'next';

import Link from '@/components/ui/Link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

import { genMetadata } from '@/app/metadata';
import { getArticles, getProjects } from '@/lib/microcms-client';

export const generateMetadata = async (
  _: {
    params: { slug: string };
  },
  parent: ResolvingMetadata,
) => {
  return genMetadata({
    title: '作ったもの・書いた記事',
    description: 'これまでの制作実績や執筆記事を紹介しています。',
    parent,
  });
};

const Page = async () => {
  const projects = await getProjects();
  const articles = await getArticles();

  return (
    <div className="space-y-16">
      <h1 className="text-3xl font-bold tracking-tighter">作ったもの・書いた記事</h1>
      <section>
        <h2 className="mb-6 text-2xl font-bold tracking-tighter">作ったもの</h2>
        <ul className="grid gap-8 md:grid-cols-2">
          {projects.contents.map((project) => (
            <li className="h-full" key={project.id}>
              <article className="h-full">
                <Card className="flex h-full flex-col">
                  <CardHeader>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex grow flex-col gap-y-4">
                    <img
                      src={project.thumbnail.url}
                      alt=""
                      width={project.thumbnail.width}
                      height={project.thumbnail.height}
                      decoding="async"
                      className="border"
                    />
                    <p className="text-sm">{project.lead}</p>
                    <div className="mb-0 mt-auto flex flex-col space-y-2">
                      {project.body && (
                        <Button size="sm" asChild>
                          <Link href={`/projects/${project.slug}`}>{project.title}の解説ページ</Link>
                        </Button>
                      )}
                      {project.url && (
                        <Button size="sm" variant="outline" asChild>
                          <Link href={project.url}>
                            {project.title}
                            <ExternalLink className="ml-2 size-[1em]" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </article>
            </li>
          ))}
        </ul>
      </section>
      <hr />
      <section>
        <h2 className="mb-6 text-2xl font-bold tracking-tighter">書いた記事</h2>
        <ul className="grid gap-8 md:grid-cols-2">
          {articles.contents.map((article) => (
            <li className="h-full" key={article.id}>
              <article className="h-full">
                <Card className="flex h-full flex-col">
                  <CardHeader>
                    <CardTitle className="text-xl">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex grow flex-col gap-y-4">
                    <img
                      src={article.thumbnail.url}
                      alt=""
                      width={article.thumbnail.width}
                      height={article.thumbnail.height}
                      decoding="async"
                      className="border"
                    />
                    <p className="text-sm">{article.description}</p>
                    <Link className="text-sm text-indigo-800" href={article.url}>
                      {article.title}
                      <ExternalLink className="ml-0.5 inline-block size-[1em] translate-y-0.5 align-baseline" />
                    </Link>
                  </CardContent>
                </Card>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Page;
