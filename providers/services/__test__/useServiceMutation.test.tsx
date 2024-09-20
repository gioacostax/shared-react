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

test('useServiceMutation hook', async () => {
  const { result } = renderHook(() => useServiceMutation(new AxiosService({ key: 'key' })), {
    wrapper: ServicesProvider,
  });

  /* Assertions */
  await expect(result.current.mutateAsync({})).resolves.toBe('mock');
});
