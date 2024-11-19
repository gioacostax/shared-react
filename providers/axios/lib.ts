import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';

export type ServiceParams = object | URLSearchParams;
export type ServiceData = object | BodyInit;
export type ServiceResponse = boolean | number | object | string | null | undefined;

export interface AxiosCustomConfig<P, D> extends AxiosRequestConfig<D> {
  readonly key: string;
  readonly params?: P | URLSearchParams;
  readonly useConfigHook?: () => () => Promise<Omit<AxiosCustomConfig<P, D>, 'useConfigHook'>>;
}

export class AxiosConfig<
  P extends ServiceParams,
  D extends ServiceData,
  R extends ServiceResponse,
> {
  key: string;
  instance?: AxiosInstance;
  usePayloadHook?: AxiosCustomConfig<P, D>['useConfigHook'];

  constructor(config: AxiosCustomConfig<P, D>) {
    this.key = config.key;
    this.instance = axios.create(config);
    this.usePayloadHook = config.useConfigHook;
  }

  async fetch(options?: Omit<AxiosCustomConfig<P, D>, 'key'>) {
    return this.instance!.request<R, AxiosResponse<R, D>, D>({
      ...(this.instance!.defaults as Omit<AxiosCustomConfig<P, D>, 'useConfigHook'>),
      ...options,
    });
  }
}
