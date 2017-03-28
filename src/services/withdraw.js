import xFetch from '../utils/xFetch.js';

export async function getList(withdrawalsType, options) {
  return await xFetch(`/api/services/app/withdrawals/GetWithdrawalsAdminList?withdrawalsType=${withdrawalsType}`, options);
}

export async function enable(options) {
  return await xFetch(`/api/services/app/withdrawals/EnableAutoAuditing`, options);
}

export async function disable(options) {
  return await xFetch(`/api/services/app/withdrawals/DisableAutoAuditing`, options);
}

export async function pass(id, options) {
  return await xFetch(`/api/services/app/withdrawals/PassWithdrawals?id=${id}`, options);
}

export async function notPass(id, options) {
  return await xFetch(`/api/services/app/withdrawals/NotPassWithdrawals?id=${id}`, options);
}

export async function reTry(id, options) {
  return await xFetch(`/api/services/app/withdrawals/RetryWithdrawals?id=${id}`, options);
}

export async function done(id, options) {
  return await xFetch(`/api/services/app/withdrawals/DoneWithdrawals?id=${id}`, options);
}
