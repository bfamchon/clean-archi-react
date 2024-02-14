import { Outlet, useParams } from 'react-router-dom';

export const ProfileLayout = () => {
  const params = useParams();
  const userId = params.userId as string;
  return (
    <>
      <p>profile layout of {userId}</p>
      <Outlet />
    </>
  );
};
