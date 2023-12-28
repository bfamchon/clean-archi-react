import { Provider } from '@/Provider';
import { FakeAuthGateway } from '@/lib/auth/adapters/fake-auth.gateway';
import { createStore } from '@/lib/create-store';
import { FakeWatchBoxGateway } from '@/lib/watch-box/adapters/fake-watch-box-gateway';
import { watchBoxBuilder } from '@/lib/watch-box/utils/watch-box.builder';
import { createRouter } from '@/router';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
describe('Get auth user watch-box', () => {
  it('should display authenticated user watch-box on the home page', async () => {
    const authGateway = new FakeAuthGateway();
    authGateway.authUser = 'Baptiste';
    const watchBoxesGateway = new FakeWatchBoxGateway();
    const builder = watchBoxBuilder();
    watchBoxesGateway.watchBoxByUser.set(
      authGateway.authUser,
      builder
        .withId('wb-1')
        .withUser('Baptiste')
        .withName('Frontend')
        .withArticles([
          { id: 'article-1', name: 'xyz', sharedBy: 'Baptiste', sharedAt: '2023-01-01T12:00:00.000Z' }
        ])
        .build()
    );
    const store = createStore({
      authGateway,
      watchBoxesGateway
    });
    const router = createRouter({ store });
    render(<Provider store={store} router={router} />);
    expect(await screen.findByText('Hello world')).toBeInTheDocument();
  });
});
