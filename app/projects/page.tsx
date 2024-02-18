import { ExternalLink } from 'lucide-react';
import { ResolvingMetadata } from 'next';

import Link from '@/components/ui/Link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

import { genMetadata } from '@/app/metadata';
import { getProjects } from '@/lib/microcms-client';

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

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold tracking-tighter">作ったもの・書いた記事</h1>
      <ul className="flex flex-wrap gap-4">
        {projects.contents.map((project) => (
          <li className="w-full md:w-1/2" key={project.id}>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <img
                  src={project.thumbnail.url}
                  alt=""
                  width={project.thumbnail.width}
                  height={project.thumbnail.height}
                  decoding="async"
                  className="border"
                />
                <p className="text-sm">{project.lead}</p>
                <div className="flex flex-col space-y-2">
                  <Button size="sm" asChild>
                    <Link href={`/projects/${project.slug}`}>{project.title}の解説ページ</Link>
                  </Button>
                  {project.link && (
                    <Button size="sm" variant="outline" asChild>
                      <Link href={project.link}>
                        {project.title}
                        <ExternalLink className="ml-2 size-[1em]" />
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
