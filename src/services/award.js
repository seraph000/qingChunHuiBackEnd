import xFetch from '../utils/xFetch.js';

export async function getList(options) {
  return await xFetch(`/api/services/app/profit/GetAdminProfit`, options)
}
