import { createEntityAdapter } from '@reduxjs/toolkit';

export type Article = {
  id: string;
  name: string;
  sharedBy: string;
  sharedAt: string;
};

export const articleAdapter = createEntityAdapter<Article>();
