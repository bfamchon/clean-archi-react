import { AuthGateway } from '@/lib/auth/model/auth.gateway';
import { userAuthenticated } from '@/lib/auth/reducer';
import { AppStore } from '@/lib/create-store';

export const onAuthStateChangeListener = ({
  store,
  authGateway
}: {
  store: AppStore;
  authGateway: AuthGateway;
}) => {
  authGateway.onAuthStateChanged((maybeUser: string | null) => {
    if (maybeUser) {
      store.dispatch(userAuthenticated({ authUser: maybeUser }));
    }
  });
};
