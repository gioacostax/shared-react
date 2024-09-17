/**
 * This file can be used to define Services utils
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
  results?: {
    preset: import('./index').AxiosService<P, D, R>;
    result: Partial<
      import('@tanstack/react-query').UseQueryResult<
        import('axios').AxiosResponse<R, D>,
        import('axios').AxiosError<R, D>
      >
    >;
  }[],
) =>
  useServiceQueryMockFn.mockImplementation(
    (_preset) =>
      (results
        ?.slice()
        .reverse()
        .find(({ preset }) => _preset.key === preset.key)?.result ??
        {}) as import('@tanstack/react-query').UseQueryResult<
        import('axios').AxiosResponse<R, D>,
        import('axios').AxiosError<R, D>
      >,
  );

export const useServiceMutationMock = <
  P extends import('./axios').ServiceParams,
  D extends import('./axios').ServiceData,
  R extends import('./axios').ServiceResponse,
>(
  results?: {
    preset: import('./index').AxiosService<P, D, R>;
    result: Partial<
      import('@tanstack/react-query').UseMutationResult<
        import('axios').AxiosResponse<R, D>,
        import('axios').AxiosError<R, D>,
        Partial<import('./axios').AxiosCustomConfig<P, D>>
      >
    >;
  }[],
) =>
  useServiceMutationMockFn.mockImplementation(
    (_preset) =>
      (results
        ?.slice()
        .reverse()
        .find(({ preset }) => _preset.key === preset.key)?.result ??
        {}) as import('@tanstack/react-query').UseMutationResult<
        import('axios').AxiosResponse<R, D>,
        import('axios').AxiosError<R, D>,
        Partial<import('./axios').AxiosCustomConfig<P, D>>
      >,
  );
