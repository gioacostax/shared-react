/**
 * This file can be used to define Vitest utils
 */

const useServiceQueryMockFn = vi.fn<(preset: { queryKey: unknown[] }) => unknown>();
const useServiceMutationMockFn = vi.fn<(preset: { queryKey: unknown[] }) => unknown>();
vi.mock('./index', async (requireActual) => ({
  ...(await requireActual<object>()),
  useServiceMutation: useServiceMutationMockFn,
  useServiceQuery: useServiceQueryMockFn,
}));

export const useServiceQueryMock = <
  P extends import('./lib/types').ServiceParams,
  B extends import('./lib/types').ServiceBody,
  R extends import('./lib/types').ServiceResponse,
  D = R,
  E = R,
>(
  results?: {
    preset: import('.').FetchServicePreset<P, B, R, D, E>;
    result: Partial<import('@tanstack/react-query').UseQueryResult<Partial<D extends R ? R : D>>>;
  }[],
) =>
  useServiceQueryMockFn.mockImplementation(
    (_preset) =>
      (results
        ?.slice()
        .reverse()
        .find(({ preset }) => _preset.queryKey.join() === preset.queryKey.join())?.result ??
        {}) as import('@tanstack/react-query').UseQueryResult<Partial<D extends R ? R : D>>,
  );

export const useServiceMutationMock = <
  P extends import('./lib/types').ServiceParams,
  B extends import('./lib/types').ServiceBody,
  R extends import('./lib/types').ServiceResponse,
  D = R,
  E = R,
>(
  results?: {
    preset: import('.').FetchServicePreset<P, B, R, D, E>;
    result: Partial<
      import('@tanstack/react-query').UseMutationResult<
        Partial<D extends R ? R : D>,
        Error,
        import('./types').FnPayload<P, B, R, D, E>
      >
    >;
  }[],
) =>
  useServiceMutationMockFn.mockImplementation(
    (_preset) =>
      (results
        ?.slice()
        .reverse()
        .find(({ preset }) => _preset.queryKey.join() === preset.queryKey.join())?.result ??
        {}) as import('@tanstack/react-query').UseMutationResult<
        Partial<D extends R ? R : D>,
        Error,
        import('./types').FnPayload<P, B, R, D, E>
      >,
  );
