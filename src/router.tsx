import { AppStore } from '@/lib/create-store';
import { Home } from '@/pages/Home';
import { createHomeLoader } from '@/pages/Home/create-home-loader';
import { Login } from '@/pages/Login';
import { createBrowserRouter } from 'react-router-dom';
import { ProtectedLayout } from './pages/ProtectedLayout';

export const createRouter = ({ store }: { store: AppStore }) =>
  createBrowserRouter([
    {
      path: '/',
      element: <ProtectedLayout />,
      children: [
        {
          index: true,
          loader: createHomeLoader({ store }),
          element: <Home />
        }
      ]
    },
    {
      path: '/login',
      element: <Login />
    }
  ]);

export type AppRouter = ReturnType<typeof createRouter>;
