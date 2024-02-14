import { AppStore } from '@/lib/create-store';
import { Home } from '@/pages/Home';
import { createHomeLoader } from '@/pages/Home/create-home-loader';
import { Login } from '@/pages/Login';
import { ProfileLayout } from '@/pages/Profile/ProfileLayout';
import { ProfileWatchBox } from '@/pages/Profile/ProfileWatchBox';
import { createProfileWatchBoxLoader } from '@/pages/Profile/ProfileWatchBox/create-profile-watchbox-loader';
import { ProtectedLayout } from '@/pages/ProtectedLayout';
import { createBrowserRouter } from 'react-router-dom';

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
    },
    {
      path: 'u/:userId',
      element: <ProfileLayout />,
      children: [
        {
          index: true,
          loader: createProfileWatchBoxLoader({ store }),
          element: <ProfileWatchBox />
        },
        {
          path: 'following',
          element: <p>following</p>
        },
        {
          path: 'followers',
          element: <p>followers</p>
        }
      ]
    }
  ]);

export type AppRouter = ReturnType<typeof createRouter>;
