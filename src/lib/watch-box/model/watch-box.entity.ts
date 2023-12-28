import { createEntityAdapter } from "@reduxjs/toolkit";

export type WatchBox = {
    id: string;
    name: string;
    user: string;
    articles: string[]
}


export const watchBoxAdapter = createEntityAdapter<WatchBox>();
