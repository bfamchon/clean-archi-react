import { userAuthenticated } from '@/lib/auth/reducer';
import { createTestStore } from '@/lib/create-store';
import { describe, expect, it } from 'vitest';
import { FakeAuthGateway } from './../adapters/fake-auth.gateway';
describe('On auth state change listener', () => {
  it('should dispatch user authenticated action when auth gateway notifies user is authenticated', () => {
    const authGateway = new FakeAuthGateway();
    const store = createTestStore({ authGateway });

    authGateway.simulateAuthStateChange('Baptiste');

    expect(store.getActions()).toContainEqual(userAuthenticated({ authUser: 'Baptiste' }));
  });
});
