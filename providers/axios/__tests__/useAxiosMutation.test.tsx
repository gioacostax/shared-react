import { renderHook, waitFor } from '@testing-library/react';

import ServicesProvider, { AxiosConfig, useAxiosMutation } from '../index';

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

describe('useAxiosMutation hook', () => {
  test('renders hook', async () => {
    const { result } = renderHook(() => useAxiosMutation(new AxiosConfig({ key: 'key' })), {
      wrapper: ServicesProvider,
    });

    /* Actions */
    await result.current.mutateAsync({});

    /* Assertions */
    await waitFor(() => {
      expect(result.current.data).toBe('mock');
    });
  });

  test('renders hook with mock', async () => {
    const { result } = renderHook(
      () => useAxiosMutation(new AxiosConfig({ key: 'key' }), { mock: { data: 'mock option' } }),
      {
        wrapper: ServicesProvider,
      },
    );

    /* Actions */
    await result.current.mutateAsync({});

    /* Assertions */
    await waitFor(() => {
      expect(result.current.data).toEqual({ data: 'mock option' });
    });
  });
});
