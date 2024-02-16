import { createClient } from 'microcms-js-sdk';

import type { MicroCMSQueries, MicroCMSImage, MicroCMSDate } from 'microcms-js-sdk';

type Page = {
  id: string;
  title: string;
  slug: string;
  description: string;
  body: string;
  accordions:
    | {
        fieldId: 'item';
        title: string;
        body: string;
      }[]
    | null;
} & MicroCMSDate;

type Project = {
  id: string;
  title: string;
  thumbnail: MicroCMSImage;
  description: string;
  body: string;
} & MicroCMSDate;

type Settings = {
  projectPage: {
    id: string;
    title: string;
    slug: string;
    description: string;
  } & MicroCMSDate;
};

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is required');
}

const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

export const getPages = async (queries?: MicroCMSQueries) => {
  const pages = await client.getList<Page>({ endpoint: 'pages', queries });
  return pages;
};

export const getPage = async (contentId: string, queries?: MicroCMSQueries) => {
  const page = await client.getListDetail<Page>({ endpoint: 'pages', contentId, queries });
  return page;
};

export const getProjects = async (queries?: MicroCMSQueries) => {
  const projects = await client.getList<Project>({ endpoint: 'projects', queries });
  return projects;
};

export const getProject = async (contentId: string, queries?: MicroCMSQueries) => {
  const project = await client.getListDetail<Project>({ endpoint: 'projects', contentId, queries });
  return project;
};

export const getSettings = async () => {
  const settings = await client.getObject<Settings>({ endpoint: 'settings' });
  return settings;
};
