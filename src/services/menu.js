import xFetch from '../utils/xFetch.js';

export async function getMenu(options) {
  return await xFetch(`/api/Menus`, options);
}
