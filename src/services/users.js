import { fetch } from '../utils';

/**
 * login
 */
export async function userLogin(params) {
  return fetch('/api/login', {
    body: params,
  });
}

/**
 * logout
 */
export async function userLogout(params) {
  return fetch('/api/logout', {
    body: params,
  });
}
