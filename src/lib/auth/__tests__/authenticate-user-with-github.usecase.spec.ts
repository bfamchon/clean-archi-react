import { FakeAuthGateway } from '@/lib/auth/adapters/fake-auth.gateway';
import { authenticateWithGitHub } from '@/lib/auth/usecases/authenticate-user-with-github.usecase';
import { createTestStore } from '@/lib/create-store';
import { stateBuilder } from '@/lib/state.builder';
import { describe, expect, test } from 'vitest';
describe('Feature: Authenticate with GitHub', () => {
  test('Example: Baptiste is authenticated with GitHub successfully', async () => {
    givenAuthenticationWithGitHubWillSucceedForUser('Baptiste');

    await whenUserAuthenticatesWithGitHub();

    thenAuthenticatedUserShouldBe({ authUser: 'Baptiste' });
  });
});

const authGateway = new FakeAuthGateway();

const store = createTestStore({
  authGateway
});

function givenAuthenticationWithGitHubWillSucceedForUser(authUser: string) {
  authGateway.willSucceedWithGitHubForUser = authUser;
}
async function whenUserAuthenticatesWithGitHub() {
  return store.dispatch(authenticateWithGitHub());
}
function thenAuthenticatedUserShouldBe({ authUser }: { authUser: string }) {
  const expectedState = stateBuilder().withAuthUser({ authUser }).build();
  expect(store.getState()).toEqual(expectedState);
}
