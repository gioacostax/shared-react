import React, { type FC, type PropsWithChildren } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

import { AxiosService } from '../axios';
import useServiceQuery from '../useServiceQuery';

///////////////////// MOCKING /////////////////////
vi.mock('axios', () => ({
  default: {
    create: () => ({
      defaults: {},
      request: vi.fn().mockResolvedValue('mock'),
    }),
  },
}));
///////////////////////////////////////////////////

const QueryProvider: FC<PropsWithChildren> = ({ children }) => (
  <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>
);

describe('useServiceQuery hook', () => {
  test('renders hook', async () => {
    const { result } = renderHook(() => useServiceQuery(new AxiosService({ key: 'key' })), {
      wrapper: QueryProvider,
    });

    /* Assertions */
    await waitFor(() => {
      expect(result.current.data).toBe('mock');
    });
  });
});
