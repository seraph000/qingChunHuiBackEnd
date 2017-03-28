import xFetch from '../utils/xFetch.js';

export async function login(options) {
  return await xFetch(`/api/Account`, options);
}
