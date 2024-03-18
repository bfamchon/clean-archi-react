import { Provider } from '@/Provider.tsx';
import { FakeAuthGateway } from '@/lib/auth/adapters/fake-auth.gateway.ts';
import { createStore } from '@/lib/create-store.ts';
import { createRouter } from '@/router';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { FakeAuthStorageGateway } from './lib/auth/adapters/fake-storage-auth.gateway';
import { users } from './lib/fake-data';
import { FakeArticleGateway } from './lib/watch-box/adapters/fake-article.gateway';
import { FakeDataWatchBoxGateway } from './lib/watch-box/adapters/fake-data-watch-box.gateway';
import { RealDateProvider } from './lib/watch-box/adapters/real-date-provider';

const fakeAuthGateway = new FakeAuthGateway(100);
fakeAuthGateway.willSucceedWithGoogleForUser = users.values().next().value;
fakeAuthGateway.willSucceedWithGitHubForUser = users.values().next().value;
const watchBoxesGateway = new FakeDataWatchBoxGateway(2000);
const authGateway = new FakeAuthStorageGateway(fakeAuthGateway);
const dateProvider = new RealDateProvider();
const articleGateway = new FakeArticleGateway();
const store = createStore({
  authGateway,
  watchBoxesGateway,
  dateProvider,
  articleGateway
});

const router = createRouter({ store });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store} router={router} />
  </React.StrictMode>
);
