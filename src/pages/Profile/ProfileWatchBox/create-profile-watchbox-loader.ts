import { AppStore } from '@/lib/create-store';
import { getUserWatchBox } from '@/lib/watch-box/usecases/get-user-watch-box.usecase';
import { LoaderFunction } from 'react-router-dom';

export const createProfileWatchBoxLoader =
  ({ store }: { store: AppStore }): LoaderFunction =>
  ({ params }) => {
    const userId = params.userId as string;
    store.dispatch(getUserWatchBox({ userId }));
    console.log(store);
    return null;
  };
