import type { FetchPreset, ServiceBody, ServiceParams, ServiceResponse } from './types';

interface FetchServicePresetParams<
  P extends ServiceParams,
  B extends ServiceBody,
  R extends ServiceResponse,
  E = R,
> {
  readonly body?: B;
  readonly headers?: HeadersInit;
  readonly isError?: (response: E) => boolean;
  readonly method: string;
  readonly options?: Omit<RequestInit, 'boyd' | 'headers' | 'method'>;
  readonly params?: P;
  readonly url: string;
}

export type FetchServicePayload<
  P extends ServiceParams,
  B extends ServiceBody,
  R extends ServiceResponse,
  D = R,
  E = R,
> = {
  path?: string;
} & Pick<FetchPreset<P, B, R, D, E>, 'body' | 'headers' | 'params'>;

const fetchService = <
  P extends ServiceParams,
  B extends ServiceBody,
  R extends ServiceResponse,
  E = R,
>({
  body,
  headers,
  isError,
  method,
  options,
  params,
  url,
}: FetchServicePresetParams<P, B, R, E>) =>
  new Promise<R>((resolve, reject: Reject<Error>) => {
    // Delete empty strings values from params
    const _params = new URLSearchParams(params as URLSearchParams);
    const cleanedParams = new URLSearchParams(params as URLSearchParams);
    _params.forEach((value, key) => {
      if (value === '') cleanedParams.delete(key);
    });

    const __params = cleanedParams.size ? `?${cleanedParams.toString()}` : '';
    fetch(`${url}${__params}`, {
      body: typeof body === 'object' ? JSON.stringify(body) : body,
      headers: {
        ...(typeof body === 'object' ? { 'Content-Type': 'application/json' } : {}),
        ...headers,
      },
      method,
      ...options,
    })
      .then((response) => {
        if (!response.ok)
          // Test .json() to know if the response has additional info
          response
            .json()
            .then((data: E) => {
              reject(
                new Error('Service error', {
                  cause: {
                    details: data,
                    message: response.statusText,
                    status: response.status,
                    type: 'service',
                  },
                }),
              );
            })
            .catch((err: Error) => {
              reject(
                new Error('Communication error', {
                  cause: {
                    details: err,
                    message: response.statusText,
                    status: response.status,
                    type: 'communication',
                  },
                }),
              );
            });
        else if (response.headers.get('content-type')?.match(/application\/json/)) {
          response
            .json()
            .then((data: E | R) => {
              if (isError?.(data as E)) {
                reject(
                  new Error('Service error', {
                    cause: {
                      details: data as E,
                      message: 'Service error',
                      status: response.status,
                      type: 'service',
                    },
                  }),
                );
              }

              resolve(data as R);
            })
            .catch((err: Error) => {
              reject(
                new Error('Parse error', {
                  cause: {
                    details: err,
                    message: `${err.name}: ${err.message}`,
                    status: response.status,
                    type: 'parse',
                  },
                }),
              );
            });
        } else {
          resolve(undefined as R);
        }
      })
      .catch((err: Error) => {
        reject(
          new Error('Fetch error', {
            cause: {
              details: err,
              message: `${err.name}: ${err.message}`,
              status: 400,
              type: 'fetch',
            },
          }),
        );
      });
  });

export class FetchServicePreset<
  P extends ServiceParams,
  B extends ServiceBody,
  R extends ServiceResponse,
  D = R,
  E = R,
> {
  #isError?: FetchPreset<P, B, R, D, E>['isError'];
  #method: FetchPreset<P, B, R, D, E>['method'];
  #options?: FetchPreset<P, B, R, D, E>['options'];
  #payload?: FetchServicePayload<P, B, R, D, E>;
  #url: FetchPreset<P, B, R, D, E>['url'];
  parseData?: FetchPreset<P, B, R, D, E>['parseData'];
  queryKey: FetchPreset<P, B, R, D, E>['queryKey'];
  usePayloadHook?: () => () => Promise<FetchServicePayload<P, B, R, D, E>>;

  constructor(
    params: D extends R
      ? Omit<FetchPreset<P, B, R, D, E>, 'parseData'>
      : FetchPreset<P, B, R, D, E>,
  ) {
    this.queryKey = params.queryKey;
    this.usePayloadHook = params.usePayloadHook as () => () => Promise<
      FetchServicePayload<P, B, R, D, E>
    >;
    this.#method = params.method;
    this.#url = params.url;
    this.#payload = {
      body: params.body,
      headers: params.headers,
      params: params.params,
    };
    this.parseData = (params as FetchPreset<P, B, R, D, E> | undefined)?.parseData;
    this.#isError = params.isError;
    this.#options = params.options;
  }

  async fetch(options?: FetchServicePayload<P, B, R, D, E>) {
    return fetchService<P, B, R, E>({
      body: this.#payload?.body ?? options?.body,
      headers: {
        ...this.#payload?.headers,
        ...options?.headers,
      },
      isError: this.#isError,
      method: this.#method,
      options: this.#options,
      params: this.#payload?.params ?? options?.params,
      url: `${this.#url}${options?.path ?? ''}`,
    });
  }
}

export default fetchService;
