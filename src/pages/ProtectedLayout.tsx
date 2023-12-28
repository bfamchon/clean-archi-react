import { selectIsUserAuthenticated } from '@/lib/auth/reducer';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

export const ProtectedLayout = () => {
  const isUserAuthenticated = useSelector(selectIsUserAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserAuthenticated) {
      navigate('/login');
    }
  }, [isUserAuthenticated, navigate]);

  if (!isUserAuthenticated) {
    return null;
  }

  return (
    <div>
      <p>protected layout</p>
      <Outlet />
    </div>
  );
};
