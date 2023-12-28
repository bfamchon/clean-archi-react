import { createAppAsyncThunk } from '@/lib/create-app-thunk';

export const authenticateWithGoogle = createAppAsyncThunk(
  'auth/authenticateWithGoogle',
  async (_, { extra: { authGateway } }) => {
    const authUser = authGateway.authenticateWithGoogle();

    return authUser;
  }
);
