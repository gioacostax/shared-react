import AxiosService from '..';

///////////////////// MOCKING /////////////////////
vi.mock('axios', () => ({
  default: {
    create: () => ({
      request: vi.fn().mockResolvedValue('mock'),
    }),
  },
}));
///////////////////////////////////////////////////

describe('class: AxiosService', () => {
  test('execute: fetch', async () => {
    const PRESET = new AxiosService({ key: 'key' });

    /* Assertions */
    await expect(PRESET.fetch()).resolves.toBe('mock');
  });
});
