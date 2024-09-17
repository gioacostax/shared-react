/**
 * This file is a custom hook useMutation from @tanstack/react-query,
 * more info in https://tanstack.com/query/latest/docs/framework/react/overview/
 */

import type { AxiosError, AxiosResponse } from 'axios';

import { type UseQueryOptions, useQuery } from '@tanstack/react-query';

import type {
  AxiosCustomConfig,
  AxiosService,
  ServiceData,
  ServiceParams,
  ServiceResponse,
} from './axios';

const useServiceQuery = <P extends ServiceParams, D extends ServiceData, R extends ServiceResponse>(
  config: AxiosService<P, D, R>,
  options?: {
    axios?: AxiosCustomConfig<P, D>;
  } & Partial<UseQueryOptions<AxiosResponse<R, D>, AxiosError<R, D>>>,
) => {
  const hookData = config.usePayloadHook?.();

  return useQuery<AxiosResponse<R, D>, AxiosError<R, D>>({
    ...options,
    queryFn: async () =>
      config.fetch({
        ...options?.axios,
        ...(await hookData?.()),
      }),
    queryKey: [
      ...(options?.queryKey ?? [config.key]),
      config.instance?.defaults.url,
      config.instance?.defaults.params,
      config.instance?.defaults.data,
    ].filter(Boolean),
  });
};

export default useServiceQuery;
