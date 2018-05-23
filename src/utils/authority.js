import { authority } from '../services/api';
// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  return authority();
}

export function setAuthority(authority) {
  return localStorage.setItem('authority', authority);
}
