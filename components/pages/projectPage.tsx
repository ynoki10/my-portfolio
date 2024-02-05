import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

import { PagesContent, ProjectsContent } from '@/types/apiResponse';

type Props = {
  page: PagesContent;
  projects: ProjectsContent[];
};

const ProjectPage = ({ page, projects }: Props) => {
  return (
    <section className="w-full py-12 sm:py-24 md:py-32 lg:py-48">
      <div className="container px-4 md:px-6">
        <div className="space-y-4">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tighter">{page.title}</h1>
            <ul className="flex flex-wrap gap-4">
              {projects.map((project) => (
                <li key={project.id}>
                  <Card className="w-1/3">
                    <CardHeader>
                      <CardTitle>{project.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <img
                        src={project.thumbnail.url}
                        alt={project.title}
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
        </div>
      </div>
    </section>
  );
};

export default ProjectPage;
