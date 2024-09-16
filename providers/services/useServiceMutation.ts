/**
 * This file is a custom hook useMutation from @tanstack/react-query,
 * more info in https://tanstack.com/query/latest/docs/framework/react/overview/
 */

import {
  type UseMutationOptions,
  type UseMutationResult,
  useMutation,
} from '@tanstack/react-query';

import type { FetchServicePreset } from './lib/fetchService';
import type { ServiceBody, ServiceParams, ServiceResponse } from './lib/types';
import type { FnPayload } from './types';

const useServiceMutation = <
  P extends ServiceParams,
  B extends ServiceBody,
  R extends ServiceResponse,
  D = R,
  E = R,
>(
  setup: FetchServicePreset<P, B, R, D, E>,
  options?: {
    onSettled?: (
      data: D extends R ? R : D | undefined,
      error: Error | null,
      variables: FnPayload<P, B, R, D, E>,
      context: unknown,
    ) => unknown;
    onSuccess?: (
      data: D extends R ? R : D,
      variables: FnPayload<P, B, R, D, E>,
      context: unknown,
    ) => unknown;
  } & Omit<
    UseMutationOptions<D extends R ? R : D, Error, FnPayload<P, B, R, D, E>>,
    'onSettled' | 'onSuccess'
  >,
) => {
  // Add aditionals hooks here...
  const hookData = setup.usePayloadHook?.();

  const mutation = useMutation<D extends R ? R : D, Error, FnPayload<P, B, R, D, E>>({
    ...options,
    mutationFn: async (fnPayload) =>
      setup.fetch({
        ...fnPayload,
        ...(await hookData?.()),
      }) as Promise<D extends R ? R : D>,
    mutationKey: setup.queryKey.concat(options?.mutationKey).filter(Boolean),
    onSettled: (data, error, fnPayload, context) =>
      options?.onSettled?.(
        (setup.parseData?.(data as R) ?? data) as D extends R ? R : D,
        error,
        fnPayload,
        context,
      ),
    onSuccess: (data, fnPayload, context) =>
      options?.onSuccess?.(
        (setup.parseData?.(data as R) ?? data) as D extends R ? R : D,
        fnPayload,
        context,
      ),
  });

  return {
    ...mutation,
    data: (mutation.data && setup.parseData
      ? setup.parseData(mutation.data as R)
      : mutation.data) as D extends R ? R : D,
    mutateAsync: (fnPayload, options) =>
      new Promise((resolve, rejects: Reject<Error>) => {
        mutation
          .mutateAsync(fnPayload, options)
          .then((data) => {
            resolve((setup.parseData ? setup.parseData(data as R) : data) as D extends R ? R : D);
          })
          .catch((err: Error) => {
            rejects(err);
          });
      }),
  } as UseMutationResult<D extends R ? R : D, Error, FnPayload<P, B, R, D, E>>;
};

export default useServiceMutation;
