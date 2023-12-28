import { AppStore } from '@/lib/create-store';
import { AppRouter } from '@/router';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

export const Provider = ({ store, router }: { store: AppStore; router: AppRouter }) => (
  <ReduxProvider store={store}>
    <RouterProvider router={router} />
    <h1>Hello world</h1>
  </ReduxProvider>
);
