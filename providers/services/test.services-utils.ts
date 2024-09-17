/**
 * Services test utils
 */

const useServiceQueryMockFn = vi.fn<(preset: { key: string }) => unknown>();
const useServiceMutationMockFn = vi.fn<(preset: { key: string }) => unknown>();
vi.mock('./index', async (requireActual) => ({
  ...(await requireActual<object>()),
  useServiceMutation: useServiceMutationMockFn,
  useServiceQuery: useServiceQueryMockFn,
}));

export const useServiceQueryMock = <
  P extends import('./axios').ServiceParams,
  D extends import('./axios').ServiceData,
  R extends import('./axios').ServiceResponse,
>(
  ...args: {
    preset: import('./index').AxiosService<P, D, R>;
    result: Partial<
      import('@tanstack/react-query').UseQueryResult<
        Partial<import('axios').AxiosResponse<R, D>>,
        Partial<import('axios').AxiosError<R, D>>
      >
    >;
  }[]
) =>
  useServiceQueryMockFn.mockImplementation(
    (_preset) =>
      args
        .slice()
        .reverse()
        .find(({ preset }) => _preset.key === preset.key)?.result ?? {},
  );

export const useServiceMutationMock = <
  P extends import('./axios').ServiceParams,
  D extends import('./axios').ServiceData,
  R extends import('./axios').ServiceResponse,
>(
  ...args: {
    preset: import('./index').AxiosService<P, D, R>;
    result: Partial<
      import('@tanstack/react-query').UseMutationResult<
        Partial<import('axios').AxiosResponse<R, D>>,
        Partial<import('axios').AxiosError<R, D>>,
        Partial<import('./axios').AxiosCustomConfig<P, D>>
      >
    >;
  }[]
) =>
  useServiceMutationMockFn.mockImplementation(
    (_preset) =>
      args
        .slice()
        .reverse()
        .find(({ preset }) => _preset.key === preset.key)?.result ?? {},
  );
