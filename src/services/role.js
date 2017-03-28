import xFetch from '../utils/xFetch.js';

export async function getList(options) {
  return await xFetch(`/api/services/app/role/GetList`, options);
}

export async function getPermissionList(options) {
  return await xFetch(`/api/services/app/role/GetPermissionList`, options)
}

export async function createRole(options) {
  return await xFetch(`/api/services/app/role/Create`, options);
}

export async function updateRole(options) {
  return await  xFetch(`/api/services/app/role/Update`, options);
}
