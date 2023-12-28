import { selectIsUserAuthenticated } from '@/lib/auth/reducer';
import { authenticateWithGitHub } from '@/lib/auth/usecases/authenticate-user-with-github.usecase';
import { authenticateWithGoogle } from '@/lib/auth/usecases/authenticate-user-with-google.usecase';
import { AppDispatch } from '@/lib/create-store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const isUserAuthenticated = useSelector(selectIsUserAuthenticated);
  const [authenticating, setAuthenticating] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const authWithGoogle = () => {
    setAuthenticating(true);
    dispatch(authenticateWithGoogle())
      .unwrap()
      .finally(() => setAuthenticating(false));
  };
  const authWithGitHub = () => {
    setAuthenticating(true);
    dispatch(authenticateWithGitHub())
      .unwrap()
      .finally(() => setAuthenticating(false));
  };

  useEffect(() => {
    if (isUserAuthenticated) {
      navigate('/');
    }
  }, [isUserAuthenticated, navigate]);

  if (isUserAuthenticated) return null;
  return (
    <>
      <h1>Login to your account</h1>
      <button onClick={authWithGoogle} disabled={authenticating}>
        With Google
      </button>
      <button onClick={authWithGitHub} disabled={authenticating}>
        With Github
      </button>
    </>
  );
};
