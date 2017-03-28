import xFetch from '../utils/xFetch.js';

export async function getWithdrawalsSetting(options) {
  return await xFetch(`/api/services/app/setting/GetWithdrawalsSetting`, options);
}

export async function setWithdrawalsSetting(options) {
  return await xFetch(`/api/services/app/setting/SetWithdrawalsSetting`, options);
}
