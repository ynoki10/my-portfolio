import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

import { getPage, getProjects } from '@/lib/microcms-client';
type Props = {
  id: string;
};
const ProjectPage = async ({ id }: Props) => {
  const page = await getPage(id);
  const projects = await getProjects();

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold tracking-tighter">{page.title}</h1>
      <ul className="flex flex-wrap gap-4">
        {projects.contents.map((project) => (
          <li key={project.id}>
            <Card className="w-full md:w-1/2">
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
                <p>{project.description}</p>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectPage;
