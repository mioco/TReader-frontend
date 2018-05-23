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

export async function getCaptchaCode(payload) {
  return request('/api/user/captcha', {
    method: 'POST',
    body: payload,
  })
}

export async function getResetUrl(payload) {
  return request('/api/user/getreseturl', {
    method: 'POST',
    body: payload,
  })
}

export async function authority() {
  return request('/api/user/authority', {
    method: 'POST',
  })
}

export async function addSubscriptionUrl(payload) {
  return request('/api/user/addSubscriptionUrl', {
    method: 'POST',
    body: payload
  })
}

export async function getSubscriptionUrl(uid) {
  return request(`/api/user/getSubscriptionUrl?uid=${uid}`)
}
