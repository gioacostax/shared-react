import { renderHook } from '@testing-library/react';

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

    /* Assertions */
    await expect(result.current.mutateAsync({})).resolves.toBe('mock');
  });

  test('renders hook with mock', async () => {
    const { result } = renderHook(
      () => useAxiosMutation(new AxiosConfig({ key: 'key' }), { mock: { data: 'mock option' } }),
      {
        wrapper: ServicesProvider,
      },
    );

    /* Assertions */
    await expect(result.current.mutateAsync({})).resolves.toEqual({ data: 'mock option' });
  });
});
