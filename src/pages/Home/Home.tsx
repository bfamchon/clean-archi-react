import '@/App.css';
import { WatchBox } from '@/components/WatchBox';
import { selectAuthenticatedUser } from '@/lib/auth/reducer';
import { useSelector } from 'react-redux';

export const Home = () => {
  const authUserId = useSelector(selectAuthenticatedUser);

  return <WatchBox userId={authUserId} />;
};
