/**
 * This file is a custom hook useMutation from @tanstack/react-query,
 * more info in https://tanstack.com/query/latest/docs/framework/react/overview/
 */

import type { AxiosError, AxiosResponse } from 'axios';

import { type UseQueryOptions, useQuery } from '@tanstack/react-query';

import type {
  AxiosConfig,
  AxiosCustomConfig,
  ServiceData,
  ServiceParams,
  ServiceResponse,
} from './lib';

const useAxiosQuery = <P extends ServiceParams, D extends ServiceData, R extends ServiceResponse>(
  config: AxiosConfig<P, D, R>,
  options?: {
    axios?: Partial<AxiosCustomConfig<P, D>>;
    mock?: Partial<AxiosResponse<R, D>>;
  } & Partial<UseQueryOptions<AxiosResponse<R, D>, AxiosError<R, D>>>,
) => {
  const hookData = config.usePayloadHook?.();

  return useQuery<AxiosResponse<R, D>, AxiosError<R, D>>({
    ...options,
    queryFn: async () =>
      (options?.mock as AxiosResponse<R, D> | undefined) ??
      config.fetch({
        ...(await hookData?.()),
        ...options?.axios,
      }),
    queryKey: options?.queryKey ?? [config.key],
  });
};

export default useAxiosQuery;
