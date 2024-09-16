import React, { type FC, type PropsWithChildren } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

import { FetchServicePreset } from '../lib/fetchService';
import useServiceQuery from '../useServiceQuery';

///////////////////// fetch Mocking /////////////////////
const fetchMock = (result: Partial<Response>, isError?: boolean, error?: Error) => {
  const mock = vi.fn();

  if (isError && error) {
    mock.mockRejectedValue(error);
  } else if (isError) {
    mock.mockResolvedValue({
      headers: new Headers({ 'Content-Type': 'application/json' }),
      json: () => Promise.reject(new Error('JSON error')),
      ok: false,
      status: 500,
      url: '/error',
      ...result,
    } as Response);
  } else {
    mock.mockResolvedValue({
      headers: new Headers({ 'Content-Type': 'application/json' }),
      json: () => Promise.resolve({}),
      ok: true,
      status: 200,
      url: '/success',
      ...result,
    } as Response);
  }

  global.fetch = mock;
  return mock;
};
/////////////////////////////////////////////////////////////

const QueryProvider: FC<PropsWithChildren> = ({ children }) => (
  <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>
);

const PRESET_MOCK = new FetchServicePreset({ method: 'GET', queryKey: ['key'], url: '/api' });
const DATA_MOCK = { data: true };

describe('useServiceQuery hook', () => {
  beforeEach(() => {
    fetchMock({ json: () => Promise.resolve(DATA_MOCK) });
  });

  test('renders hook', async () => {
    const { result } = renderHook(() => useServiceQuery(PRESET_MOCK), {
      wrapper: QueryProvider,
    });

    /* Assertions */
    await waitFor(() => {
      expect(result.current.data).toEqual(DATA_MOCK);
    });
  });
});
