import { ResolvingMetadata } from 'next';

import Link from '@/components/ui/Link';
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
      <p>アイテムをクリックすると詳細ページへ移動します。</p>
      <ul className="flex flex-wrap gap-4">
        {projects.contents.map((project) => (
          <li className="w-full md:w-1/2" key={project.id}>
            <Link href={`/projects/${project.slug}`}>
              <Card>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={project.thumbnail.url}
                    alt=""
                    width={project.thumbnail.width}
                    height={project.thumbnail.height}
                    decoding="async"
                  />
                  <p>{project.lead}</p>
                </CardContent>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
