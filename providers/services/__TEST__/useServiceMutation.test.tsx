import React, { type FC, type PropsWithChildren } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';

import { FetchServicePreset } from '../lib/fetchService';
import useServiceMutation from '../useServiceMutation';

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

describe('useServiceMutation hook', () => {
  beforeEach(() => {
    fetchMock({ json: () => Promise.resolve(DATA_MOCK) });
  });

  test('renders hook', async () => {
    const { result } = renderHook(() => useServiceMutation(PRESET_MOCK), {
      wrapper: QueryProvider,
    });

    /* Assertions */
    await expect(result.current.mutateAsync({})).resolves.toEqual(DATA_MOCK);
  });

  test('renders hook and handle onSuccess & onSettled', async () => {
    const onSuccess = vi.fn();
    const onSettled = vi.fn();
    const { result } = renderHook(
      () =>
        useServiceMutation(PRESET_MOCK, {
          onSettled,
          onSuccess,
        }),
      {
        wrapper: QueryProvider,
      },
    );

    /* Assertions */
    await result.current.mutateAsync({});
    expect(onSuccess).toHaveBeenCalledOnce();
    expect(onSettled).toHaveBeenCalledOnce();
  });

  test('renders hook with option parseData', async () => {
    PRESET_MOCK.parseData = () => 'data';
    const { rerender, result } = renderHook(() => useServiceMutation(PRESET_MOCK), {
      wrapper: QueryProvider,
    });

    /* Assertions */
    await expect(result.current.mutateAsync({})).resolves.toBe('data');

    rerender();

    /* Assertions */
    expect(result.current.data).toBe('data');
  });

  test('renders hook and mutateAsync result: error', async () => {
    fetchMock({}, true);
    const { result } = renderHook(() => useServiceMutation(PRESET_MOCK), {
      wrapper: QueryProvider,
    });

    /* Assertions */
    await expect(result.current.mutateAsync({})).rejects.toThrowError();
  });
});
