import { AxiosConfig } from '../index';

///////////////////// MOCKING /////////////////////
vi.mock('axios', () => ({
  default: {
    create: () => ({
      request: vi.fn().mockResolvedValue('mock'),
    }),
  },
}));
///////////////////////////////////////////////////

test('AxiosConfig and execute fetch', async () => {
  const PRESET = new AxiosConfig({ key: 'key' });

  /* Assertions */
  await expect(PRESET.fetch()).resolves.toBe('mock');
});
