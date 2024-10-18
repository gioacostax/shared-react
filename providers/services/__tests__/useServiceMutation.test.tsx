import { renderHook } from '@testing-library/react';

import ServicesProvider, { AxiosService, useServiceMutation } from '../index';

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

describe('useServiceMutation hook', () => {
  test('renders hook', async () => {
    const { result } = renderHook(() => useServiceMutation(new AxiosService({ key: 'key' })), {
      wrapper: ServicesProvider,
    });

    /* Assertions */
    await expect(result.current.mutateAsync({})).resolves.toBe('mock');
  });

  test('renders hook with mock', async () => {
    const { result } = renderHook(
      () => useServiceMutation(new AxiosService({ key: 'key' }), { mock: { data: 'mock option' } }),
      {
        wrapper: ServicesProvider,
      },
    );

    /* Assertions */
    await expect(result.current.mutateAsync({})).resolves.toEqual({ data: 'mock option' });
  });
});
