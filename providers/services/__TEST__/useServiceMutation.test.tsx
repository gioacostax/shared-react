import React, { type FC, type PropsWithChildren } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';

import { AxiosService } from '../axios';
import useServiceMutation from '../useServiceMutation';

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

describe('useServiceMutation hook', () => {
  test('renders hook', async () => {
    const { result } = renderHook(() => useServiceMutation(new AxiosService({ key: 'key' })), {
      wrapper: QueryProvider,
    });

    /* Assertions */
    await expect(result.current.mutateAsync({})).resolves.toBe('mock');
  });
});
