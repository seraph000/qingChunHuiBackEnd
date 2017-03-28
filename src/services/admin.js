import xFetch from '../utils/xFetch';

export async function getList(options) {
  return await xFetch(`/api/services/app/user/GetAdminList`, options);
}

export async function getSelectList(options) {
  return await xFetch(`/api/services/app/role/GetRolesDrupDownList`, options);
}

export async function createAdmin(options) {
  return await xFetch(`/api/services/app/user/CreateAdmin`, options)
}

export async function deleteAdmin(id, options) {
  return await xFetch(`/api/services/app/user/DeleteAdmin?id=${id}`, options);
}
