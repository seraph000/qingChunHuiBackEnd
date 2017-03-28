import xFetch from '../utils/xFetch.js';

export async function getMemberSetting(options) {
  return await xFetch(`/api/services/app/setting/GetMemberSetting`, options);
}

export async function setMemberSetting(options) {
  return await xFetch(`/api/services/app/setting/SetMemberSetting`, options);
}
