import { getPage } from '@/lib/microcms-client';

type Props = {
  id: string;
};

const NormalPage = async ({ id }: Props) => {
  const page = await getPage(id);

  return (
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
  );
};

export default NormalPage;
