import fetchService, { FetchServicePreset } from '../fetchService';

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

const DATA_MOCK = { data: true };
const FN_PARAMS_MOCK = { method: 'GET', url: '/api' };

describe('fn: fetchService', () => {
  test('execute: success', async () => {
    fetchMock({ json: () => Promise.resolve(DATA_MOCK) });

    /* Assertions */
    await expect(fetchService(FN_PARAMS_MOCK)).resolves.toEqual(DATA_MOCK);
  });

  test('execute without "Content-Type" header: success', async () => {
    fetchMock({ headers: new Headers() });

    /* Assertions */
    await expect(fetchService(FN_PARAMS_MOCK)).resolves.toBeUndefined();
  });

  test('execute with params and body: success', async () => {
    const mock = fetchMock({ json: () => Promise.resolve(DATA_MOCK) });
    await fetchService({
      ...FN_PARAMS_MOCK,
      body: { token: 'token' },
      params: { param1: 'valid', param2: '' },
    });

    /* Assertions */
    expect(mock).toHaveBeenCalledWith('/api?param1=valid', {
      body: '{"token":"token"}',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    });
  });

  test('execute: json error', async () => {
    fetchMock({ json: () => Promise.reject(new Error()) });

    /* Assertions */
    await expect(fetchService(FN_PARAMS_MOCK)).rejects.toThrowError('Parse error');
  });

  test('execute: comm error', async () => {
    fetchMock(
      {
        json: () => Promise.reject(new Error()),
        statusText: 'Fetch error',
      },
      true,
    );

    /* Assertions */
    await expect(fetchService(FN_PARAMS_MOCK)).rejects.toThrowError('Communication error');
  });

  test('execute: service error', async () => {
    fetchMock(
      {
        json: () => Promise.resolve(),
        statusText: 'Fetch error',
      },
      true,
    );

    /* Assertions */
    await expect(fetchService(FN_PARAMS_MOCK)).rejects.toThrowError('Service error');
  });

  test('execute: isError (custom errorType)', async () => {
    fetchMock({
      json: () => Promise.resolve(),
    });

    /* Assertions */
    await expect(
      fetchService({
        ...FN_PARAMS_MOCK,
        isError: () => true,
      }),
    ).rejects.toThrowError('Service error');
  });

  test('execute: fetch error', async () => {
    fetchMock({}, true, new Error('Fetch error'));

    /* Assertions */
    await expect(fetchService(FN_PARAMS_MOCK)).rejects.toThrowError('Fetch error');
  });
});

describe('class: FetchServicePreset', () => {
  beforeEach(() => {
    fetchMock({ json: () => Promise.resolve(DATA_MOCK) });
  });

  test('execute: fetch', async () => {
    const PRESET = new FetchServicePreset({ method: 'GET', queryKey: ['key'], url: '/api' });

    /* Assertions */
    await expect(PRESET.fetch()).resolves.toEqual(DATA_MOCK);
  });
});
