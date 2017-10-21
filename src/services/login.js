import {request, config} from '../utils';
const {requestGet, requestPost} = request;

/**
 * 登录
 * @param data
 * @returns {Promise.<Response>}
 */
export async function login(data) {
  let url = config.requestHttp + config.api.login;
  return requestPost(url, data);
}

/**
 * 判断是否登录
 * @param data
 * @returns {Promise.<Response>}
 */
export async function isLogin(data) {
  let url = config.requestHttp + config.api.isLogin;
  return requestGet(url, data);
}

/**
 * 登出
 * @param data
 * @returns {Promise.<Response>}
 */
export async function logOut(data) {
  let url = config.requestHttp + config.api.logOut;
  return requestGet(url, data);
}
