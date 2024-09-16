import type { FetchServicePayload } from './lib/fetchService';
import type { ServiceBody, ServiceParams, ServiceResponse } from './lib/types';

export type FnPayload<
  P extends ServiceParams,
  B extends ServiceBody,
  R extends ServiceResponse,
  D = R,
  E = R,
> = FetchServicePayload<P, B, R, D, E>;
