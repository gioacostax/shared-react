import { renderHook, waitFor } from '@testing-library/react';

import ServicesProvider, { AxiosService, useServiceQuery } from '../index';

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

describe('useServiceQuery hook', () => {
  test('renders hook', async () => {
    const { result } = renderHook(() => useServiceQuery(new AxiosService({ key: 'key' })), {
      wrapper: ServicesProvider,
    });

    /* Assertions */
    await waitFor(() => {
      expect(result.current.data).toBe('mock');
    });
  });

  test('renders hook with mock', async () => {
    const { result } = renderHook(
      () => useServiceQuery(new AxiosService({ key: 'key' }), { mock: { data: 'mock option' } }),
      {
        wrapper: ServicesProvider,
      },
    );

    /* Assertions */
    await waitFor(() => {
      expect(result.current.data).toEqual({ data: 'mock option' });
    });
  });
});
