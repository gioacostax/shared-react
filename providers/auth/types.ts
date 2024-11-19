export interface APIResponse<T = unknown> {
  code: number;
  data: T;
  msg: string;
}
