import { AxiosService } from '../index';

///////////////////// MOCKING /////////////////////
vi.mock('axios', () => ({
  default: {
    create: () => ({
      request: vi.fn().mockResolvedValue('mock'),
    }),
  },
}));
///////////////////////////////////////////////////

test('AxiosService and execute fetch', async () => {
  const PRESET = new AxiosService({ key: 'key' });

  /* Assertions */
  await expect(PRESET.fetch()).resolves.toBe('mock');
});
