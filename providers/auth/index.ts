import { type FC, type PropsWithChildren, useEffect } from 'react';

import { useAxiosQuery } from '../axios';
import { POST_SESSION } from './post_session';

interface Props {
  loginUrl: string;
}

const AuthProvider: FC<PropsWithChildren<Props>> = ({ children, loginUrl }) => {
  const { data, error, isFetching, refetch } = useAxiosQuery(POST_SESSION);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isFetching && data?.data && new Date(data.data.data.exp * 1000) < new Date(Date.now())) {
        void refetch();
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [data, refetch, isFetching]);

  if (error) {
    alert('Authentication failed, redirecting to login...');
    const fallbackParams = new URLSearchParams();
    fallbackParams.append('fallback', location.href.replace(/^https?:\/\//, ''));

    const fallbackUrl = new URL(`?${fallbackParams.toString()}`, loginUrl);
    location.assign(fallbackUrl.toString());
  }

  return data?.data.data ? children : null;
};

export default AuthProvider;
