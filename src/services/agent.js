import xFetch from '../utils/xFetch.js';

export async function getList(options) {
  return await xFetch(`/api/services/app/tenant/GetTenants`, options);
}

export async function createTenant(options) {
  return await xFetch(`/api/services/app/tenant/CreateTenant`, options);
}

export async function disable(id, options) {
  return await xFetch(`/api/services/app/tenant/Disable?id=${id}`, options);
}

export async function enable(id, options) {
  return await xFetch(`/api/services/app/tenant/Enable?id=${id}`, options);
}
