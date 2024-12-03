import { AxiosConfig } from '@shared/react/providers/axios';

import env from '@/env';

import type { APIResponse } from './types';
export { default as POST_SESSION_MOCK } from './__mocks__/post_session.response.json';

export interface SessionResponse {
  exp: number;
  jti: string;
  sub: string;
}

export const POST_SESSION = new AxiosConfig<never, never, APIResponse<SessionResponse>>({
  key: 'POST_SESSION',
  method: 'POST',
  url: `${env.API_URL}/auth/v1/session`,
  withCredentials: true,
});
