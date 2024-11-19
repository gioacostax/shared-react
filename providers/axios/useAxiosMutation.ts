/**
 * This file is a custom hook useMutation from @tanstack/react-query,
 * more info in https://tanstack.com/query/latest/docs/framework/react/overview/
 */

import type { AxiosError, AxiosResponse } from 'axios';

import { type UseMutationOptions, useMutation } from '@tanstack/react-query';

import type {
  AxiosConfig,
  AxiosCustomConfig,
  ServiceData,
  ServiceParams,
  ServiceResponse,
} from './lib';

const useAxiosMutation = <
  P extends ServiceParams,
  D extends ServiceData,
  R extends ServiceResponse,
>(
  config: AxiosConfig<P, D, R>,
  options?: {
    axios?: Partial<AxiosCustomConfig<P, D>>;
    mock?: Partial<AxiosResponse<R, D>>;
  } & UseMutationOptions<AxiosResponse<R, D>, AxiosError<R, D>, Partial<AxiosCustomConfig<P, D>>>,
) => {
  const hookData = config.usePayloadHook?.();

  return useMutation<AxiosResponse<R, D>, AxiosError<R, D>, Partial<AxiosCustomConfig<P, D>>>({
    ...options,
    mutationFn: async (variables) =>
      (options?.mock as AxiosResponse<R, D> | undefined) ??
      config.fetch({
        ...(await hookData?.()),
        ...variables,
      }),
    mutationKey: options?.mutationKey ?? [config.key],
  });
};

export default useAxiosMutation;
