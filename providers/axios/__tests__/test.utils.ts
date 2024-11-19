/**
 * Services test utils
 */

const useAxiosQueryMockFn = vi.fn<(preset: { key: string }) => unknown>();
const useAxiosMutationMockFn = vi.fn<(preset: { key: string }) => unknown>();
vi.mock('../index', async (requireActual) => ({
  ...(await requireActual<object>()),
  useAxiosMutation: useAxiosMutationMockFn,
  useAxiosQuery: useAxiosQueryMockFn,
}));

export const useAxiosQueryMock = <
  P extends import('../lib').ServiceParams,
  D extends import('../lib').ServiceData,
  R extends import('../lib').ServiceResponse,
>(
  ...args: {
    preset: import('../index').AxiosConfig<P, D, R>;
    result?: Partial<
      import('@tanstack/react-query').UseQueryResult<
        Partial<import('axios').AxiosResponse<R, D>>,
        Partial<import('axios').AxiosError<R, D>>
      >
    >;
  }[]
) =>
  useAxiosQueryMockFn.mockImplementation(
    (_preset) =>
      args
        .slice()
        .reverse()
        .find(({ preset }) => _preset.key === preset.key)?.result ?? {},
  );

export const useAxiosMutationMock = <
  P extends import('../lib').ServiceParams,
  D extends import('../lib').ServiceData,
  R extends import('../lib').ServiceResponse,
>(
  ...args: {
    preset: import('../index').AxiosConfig<P, D, R>;
    result?: Partial<
      import('@tanstack/react-query').UseMutationResult<
        Partial<import('axios').AxiosResponse<R, D>>,
        Partial<import('axios').AxiosError<R, D>>,
        Partial<import('../lib').AxiosCustomConfig<P, D>>
      >
    >;
  }[]
) =>
  useAxiosMutationMockFn.mockImplementation(
    (_preset) =>
      args
        .slice()
        .reverse()
        .find(({ preset }) => _preset.key === preset.key)?.result ?? {},
  );
