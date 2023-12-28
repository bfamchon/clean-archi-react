import { AppStore } from '@/lib/create-store';
import { getAuthUserWatchBox } from '@/lib/watch-box/usecases/get-auth-user-watch-box.usecase';
import { LoaderFunction } from 'react-router-dom';

export const createHomeLoader =
  ({ store }: { store: AppStore }): LoaderFunction =>
  () => {
    store.dispatch(getAuthUserWatchBox());
    return null;
  };
