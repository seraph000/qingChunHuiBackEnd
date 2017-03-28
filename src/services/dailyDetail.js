import xFetch from '../utils/xFetch.js';

export async function getList(day, options) {
  return await xFetch(`/api/services/app/profit/GetAdminProfitByDay?day=${day}`, options);
}
