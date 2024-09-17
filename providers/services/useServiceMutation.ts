/**
 * This file is a custom hook useMutation from @tanstack/react-query,
 * more info in https://tanstack.com/query/latest/docs/framework/react/overview/
 */

import type { AxiosError, AxiosResponse } from 'axios';

import { type UseMutationOptions, useMutation } from '@tanstack/react-query';

import type {
  AxiosCustomConfig,
  AxiosService,
  ServiceData,
  ServiceParams,
  ServiceResponse,
} from './axios';

const useServiceMutation = <
  P extends ServiceParams,
  D extends ServiceData,
  R extends ServiceResponse,
>(
  config: AxiosService<P, D, R>,
  options?: {
    onSettled?: (
      data: AxiosResponse<R, D> | undefined,
      error: AxiosError<R, D> | null,
      variables: Partial<AxiosCustomConfig<P, D>>,
      context: unknown,
    ) => unknown;
    onSuccess?: (
      data: AxiosResponse<R, D>,
      variables: Partial<AxiosCustomConfig<P, D>>,
      context: unknown,
    ) => unknown;
  } & Omit<
    UseMutationOptions<AxiosResponse<R, D>, AxiosError<R, D>, Partial<AxiosCustomConfig<P, D>>>,
    'onSettled' | 'onSuccess'
  >,
) => {
  const hookData = config.usePayloadHook?.();

  return useMutation<AxiosResponse<R, D>, AxiosError<R, D>, Partial<AxiosCustomConfig<P, D>>>({
    ...options,
    mutationFn: async (variables) =>
      config.fetch({
        ...(await hookData?.()),
        ...variables,
      }),
    mutationKey: [
      ...(options?.mutationKey ?? [config.key]),
      config.instance?.defaults.url,
      config.instance?.defaults.params,
      config.instance?.defaults.data,
    ].filter(Boolean),
    onSettled: (data, error, variables, context) =>
      options?.onSettled?.(data, error, variables, context),
    onSuccess: (data, variables, context) => options?.onSuccess?.(data, variables, context),
  });
};

export default useServiceMutation;
