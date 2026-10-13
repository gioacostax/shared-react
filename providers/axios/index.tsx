import { QueryClient, type QueryClientConfig, QueryClientProvider } from '@tanstack/react-query';
import React, { type FC, type PropsWithChildren } from 'react';

export { AxiosConfig } from './lib';
export { default as useAxiosMutation } from './useAxiosMutation';
export { default as useAxiosQuery } from './useAxiosQuery';

const QUERY_CONFIG: QueryClientConfig = {
  defaultOptions: {
    mutations: {
      retry: false,
    },
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: false,
      retryOnMount: true,
    },
  },
};

const AxiosProvider: FC<PropsWithChildren> = ({ children }) => (
  <QueryClientProvider client={new QueryClient(QUERY_CONFIG)}>{children}</QueryClientProvider>
);

export default AxiosProvider;
