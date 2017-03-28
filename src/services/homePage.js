import xFetch from '../utils/xFetch.js';

export async function getHome(options) {
  return await xFetch(`/api/services/app/mainPage/GetAdminMainPage`, options)
}

//代理商主页信息
export async function getTenantMainPage(options) {
  return await xFetch(`/api/services/app/mainPage/GetTenantMainPage`, options)
}