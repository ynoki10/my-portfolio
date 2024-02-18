import { ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

import Link from '@/components/ui/Link';

import { genMetadata } from '@/app/metadata';
import { getProjects } from '@/lib/microcms-client';

export const generateMetadata = async (
  {
    params,
  }: {
    params: { slug: string };
  },
  parent: ResolvingMetadata,
) => {
  const slug = params.slug;
  const projects = await getProjects();
  const project = projects.contents.find((p) => p.slug === slug);
  if (!project) throw new Error(`Project not found for slug: ${slug}`);

  return genMetadata({
    title: project.title,
    description: project.description,
    parent,
  });
};

export async function generateStaticParams() {
  const projects = await getProjects();
  const paths = projects.contents.map((project) => {
    return { slug: project.slug };
  });
  return paths;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const projects = await getProjects();
  const project = projects.contents.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <>
      <article className="space-y-10">
        <h1 className="text-3xl font-bold tracking-tighter">{project.title}</h1>
        <img
          src={project.thumbnail.url}
          alt=""
          width={project.thumbnail.width}
          height={project.thumbnail.height}
          decoding="async"
          className="border"
        />
        <div className="prose prose-slate">
          {project.body && <div dangerouslySetInnerHTML={{ __html: project.body }}></div>}
        </div>
      </article>
      <Link href="/projects" className="mt-16 w-fit text-indigo-800">
        <span aria-hidden>← </span>
        <span className="underline">一覧へ戻る</span>
      </Link>
    </>
  );
}
