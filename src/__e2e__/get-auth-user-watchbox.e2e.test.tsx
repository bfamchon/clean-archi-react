import { Provider } from '@/Provider';
import { FakeAuthGateway } from '@/lib/auth/adapters/fake-auth.gateway';
import { createStore } from '@/lib/create-store';
import { FakeArticleGateway } from '@/lib/watch-box/adapters/fake-article.gateway';
import { FakeWatchBoxGateway } from '@/lib/watch-box/adapters/fake-watch-box-gateway';
import { RealDateProvider } from '@/lib/watch-box/adapters/real-date-provider';
import { watchBoxBuilder } from '@/lib/watch-box/utils/watch-box.builder';
import { createRouter } from '@/router';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
describe('Get auth user watch-box', () => {
  it('should display authenticated user watch-box on the home page', async () => {
    const authGateway = new FakeAuthGateway();
    authGateway.authUser = 'Baptiste';
    const watchBoxesGateway = new FakeWatchBoxGateway();
    const articleGateway = new FakeArticleGateway();
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
      watchBoxesGateway,
      articleGateway,
      dateProvider: new RealDateProvider()
    });
    const router = createRouter({ store });
    render(<Provider store={store} router={router} />);
    expect(await screen.findByText('Hello world')).toBeInTheDocument();
  });
});
