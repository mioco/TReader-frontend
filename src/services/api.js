import request from '../utils/request';

export function query() {
  return request('/api/users');
}

export async function login(params) {
  return request('/api/user/login', {
    method: 'POST',
    body: params,
  });
}

export async function register(params) {
  return request('/api/user/register', {
    method: 'POST',
    body: params,
  });
}

export async function getCaptcha(payload) {
  return request('/api/user/captcha', {
    method: 'POST',
    body: payload,
  })
}
