export type PagesContent = {
  id: string;
  title: string;
  slug: string;
  description: string;
  body: string;
};

export type SettingsResponse = {
  projectPage: {
    id: string;
    title: string;
    slug: string;
    description: string;
    body: string;
  };
};

export type ProjectsContent = {
  id: string;
  title: string;
  thumbnail: {
    url: string;
    height: number;
    width: number;
  };
  description: string;
  body: string;
};
