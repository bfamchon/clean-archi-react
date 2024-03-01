import { selectAuthenticatedUser } from '@/lib/auth/reducer';
import { RootState } from '@/lib/create-store';
import { selectProfileWatchBoxViewModel } from '../Profile/ProfileWatchBox/profile-watch-box.view-model';

export const selectHomeViewModel = (getNow: () => string) => (rootState: RootState) => {
  const authUser = selectAuthenticatedUser(rootState);
  return selectProfileWatchBoxViewModel({ userId: authUser, getNow })(rootState);
};
