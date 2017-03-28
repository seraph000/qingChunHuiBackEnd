import xFetch from '../utils/xFetch.js';

export async function getList(isMember, options) {
  return await xFetch(`/api/services/app/user/GetUserList?isMember=${isMember}`, options);
}

//修改密码
export async function updatePassword(options) {
  return await xFetch('/api/services/app/user/UpdatePassword', options);
}

//短信验证码
export async function sendVerificationCode(options) {
  return await xFetch('/api/services/app/user/SendVerificationCode', options);
}

//找回密码（修改密码）
export async function updatePasswordByPhone(options) {
  return await xFetch('/api/services/app/user/UpdatePasswordByPhone', options);
}