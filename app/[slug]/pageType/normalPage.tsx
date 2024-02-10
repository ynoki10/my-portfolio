import { getPage } from '@/lib/microcms-client';

type Props = {
  id: string;
};

const NormalPage = async ({ id }: Props) => {
  const page = await getPage(id);

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tighter">{page.title}</h1>
      <div className="space-y-2" dangerouslySetInnerHTML={{ __html: page.body }}></div>
    </>
  );
};

export default NormalPage;
