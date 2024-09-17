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

test('useServiceQuery hook', async () => {
  const { result } = renderHook(() => useServiceQuery(new AxiosService({ key: 'key' })), {
    wrapper: ServicesProvider,
  });

  /* Assertions */
  await waitFor(() => {
    expect(result.current.data).toBe('mock');
  });
});
