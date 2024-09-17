import React, { type FC, type PropsWithChildren } from 'react';

import { type QueryClientConfig, QueryClient, QueryClientProvider } from '@tanstack/react-query';

export { AxiosService } from './axios';
export { default as useServiceMutation } from './useServiceMutation';
export { default as useServiceQuery } from './useServiceQuery';

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

const ServicesProvider: FC<PropsWithChildren> = ({ children }) => (
  <QueryClientProvider client={new QueryClient(QUERY_CONFIG)}>{children}</QueryClientProvider>
);

export default ServicesProvider;
