import { WatchBox } from '@/components/WatchBox';
import { useParams } from 'react-router-dom';

export const ProfileWatchBox = () => {
  const params = useParams();

  return <WatchBox userId={params.userId as string} />;
};
