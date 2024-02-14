import { Provider } from '@/Provider.tsx';
import { FakeAuthGateway } from '@/lib/auth/adapters/fake-auth.gateway.ts';
import { createStore } from '@/lib/create-store.ts';
import { FakeWatchBoxGateway } from '@/lib/watch-box/adapters/fake-watch-box-gateway.ts';
import { watchBoxBuilder } from '@/lib/watch-box/utils/watch-box.builder.ts';
import { createRouter } from '@/router';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { FakeAuthStorageGateway } from './lib/auth/adapters/fake-storage-auth.gateway';

const fakeAuthGateway = new FakeAuthGateway(100);
fakeAuthGateway.willSucceedWithGoogleForUser = 'Baptiste';
fakeAuthGateway.willSucceedWithGitHubForUser = 'Bob';
const watchBoxesGateway = new FakeWatchBoxGateway(2000);
const authGateway = new FakeAuthStorageGateway(fakeAuthGateway);

const builder = watchBoxBuilder();

watchBoxesGateway.watchBoxByUser.set(
  'Baptiste',
  builder
    .withId('wb-1')
    .withUser('Baptiste')
    .withName('Frontend')
    .withArticles([
      { id: 'article-1', name: 'xyz', sharedBy: 'Baptiste', sharedAt: '2023-01-01T12:00:00.000Z' },
      { id: 'article-2', name: 'abc', sharedBy: 'Bob', sharedAt: '2023-01-01T12:10:00.000Z' }
    ])
    .build()
);

watchBoxesGateway.watchBoxByUser.set(
  'Bob',
  builder
    .withId('wb-2')
    .withUser('Bob')
    .withName('Backend')
    .withArticles([
      { id: 'article-3', name: 'xyz', sharedBy: 'Baptiste', sharedAt: '2023-01-01T22:00:00.000Z' },
      { id: 'article-4', name: 'abc', sharedBy: 'Bob', sharedAt: '2023-01-01T22:10:00.000Z' }
    ])
    .build()
);

const store = createStore({
  authGateway,
  watchBoxesGateway
});

const router = createRouter({ store });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store} router={router} />
  </React.StrictMode>
);
