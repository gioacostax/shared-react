import { AxiosConfig } from '../../axios';
import { POST_SESSION } from '../post_session';

describe('services', () => {
  test('POST_SESSION', () => {
    expect(POST_SESSION).toBeInstanceOf(AxiosConfig);
  });
});
