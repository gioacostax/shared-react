import type { FetchServicePayload } from './fetchService';

export interface ServiceErrorFormat<Details = unknown> {
  readonly code: number | string | null;
  readonly details?: Details;
  readonly message: string;
  readonly type: 'auth' | 'communication' | 'fetch' | 'parse' | 'service';
}

export type ServiceParams = object | string | string[][] | URLSearchParams | undefined;
export type ServiceBody = object | BodyInit | undefined;
export type ServiceResponse = boolean | number | object | string | undefined;

////// Base Preset //////
export interface FetchPreset<
  Params extends ServiceParams,
  Body extends ServiceBody,
  Response extends ServiceResponse,
  Data = Response,
  Error = Response,
> {
  readonly body?: Body;

  readonly headers?: HeadersInit;
  readonly isError?: (response: Error) => boolean;

  readonly method: string;
  readonly options?: Omit<RequestInit, 'boyd' | 'headers' | 'method'>;
  readonly params?: Params;
  readonly parseData: (response: Response) => Data;

  readonly queryKey: readonly unknown[];
  readonly url: string;
  readonly usePayloadHook?: () => () => Promise<
    FetchServicePayload<Params, Body, Response, Data, Error>
  >;
}
