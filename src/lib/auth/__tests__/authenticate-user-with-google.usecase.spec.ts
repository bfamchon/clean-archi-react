import { FakeAuthGateway } from '@/lib/auth/adapters/fake-auth.gateway';
import { authenticateWithGoogle } from '@/lib/auth/usecases/authenticate-user-with-google.usecase';
import { createTestStore } from '@/lib/create-store';
import { stateBuilder } from '@/lib/state.builder';
import { describe, expect, test } from 'vitest';
describe('Feature: Authenticate with Google', () => {
  test('Example: Baptiste is authenticated with Google successfully', async () => {
    givenAuthenticationWithGoogleWillSucceedForUser('Baptiste');

    await whenUserAuthenticatesWithGoogle();

    thenAuthenticatedUserShouldBe({ authUser: 'Baptiste' });
  });
});

const authGateway = new FakeAuthGateway();

const store = createTestStore({
  authGateway
});

function givenAuthenticationWithGoogleWillSucceedForUser(authUser: string) {
  authGateway.willSucceedWithGoogleForUser = authUser;
}
async function whenUserAuthenticatesWithGoogle() {
  return store.dispatch(authenticateWithGoogle());
}
function thenAuthenticatedUserShouldBe({ authUser }: { authUser: string }) {
  const expectedState = stateBuilder().withAuthUser({ authUser }).build();
  expect(store.getState()).toEqual(expectedState);
}
