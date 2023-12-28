import { createAppAsyncThunk } from '@/lib/create-app-thunk';

export const authenticateWithGitHub = createAppAsyncThunk(
  'auth/authenticateWithGitHub',
  async (_, { extra: { authGateway } }) => {
    const authUser = authGateway.authenticateWithGitHub();

    return authUser;
  }
);
