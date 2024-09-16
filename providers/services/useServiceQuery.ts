/**
 * This file is a custom hook useMutation from @tanstack/react-query,
 * more info in https://tanstack.com/query/latest/docs/framework/react/overview/
 */

import { type UseQueryOptions, useQuery } from '@tanstack/react-query';

import type { FetchServicePreset } from './lib/fetchService';
import type { ServiceBody, ServiceParams, ServiceResponse } from './lib/types';
import type { FnPayload } from './types';

const useServiceQuery = <
  P extends ServiceParams,
  B extends ServiceBody,
  R extends ServiceResponse,
  D = R,
  E = R,
>(
  setup: FetchServicePreset<P, B, R, D, E>,
  options?: {
    fnPayload?: FnPayload<P, B, R, D, E>;
  } & Partial<UseQueryOptions<R, Error, D>>,
) => {
  // Add aditionals hooks here...
  const hookData = setup.usePayloadHook?.();

  return useQuery<R, Error, D>({
    ...options,
    queryFn: async () =>
      setup.fetch({
        ...options?.fnPayload,
        ...(await hookData?.()), // FIX: HookData replaces all the data in fnPayload
      }),
    queryKey: setup.queryKey.concat(options?.queryKey).filter(Boolean),
    select: setup.parseData,
  });
};

export default useServiceQuery;
