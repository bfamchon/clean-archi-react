import { AppStore } from '@/lib/create-store';
import { LoaderFunction } from 'react-router-dom';

export const createProfileWatchBoxLoader =
  ({ store }: { store: AppStore }): LoaderFunction =>
  () => {
    console.log(store);
    return null;
  };
