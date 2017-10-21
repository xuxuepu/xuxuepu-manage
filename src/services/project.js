import {request, config} from '../utils';
const {requestGet, requestPost, requestPostForm, requestPostUrlData} = request;

/**
 * 新增详情
 * @param data
 * @returns {Promise.<Response>}
 */
export async function viewCreate(data){
  let url = config.requestHttp + config.api.viewCreate;
  return requestPostForm(url, data);
}

/**
 * 修改详情
 * @param data
 * @returns {Promise.<Response>}
 */
export async function viewUpdate(data){
  let url = config.requestHttp + config.api.viewUpdate;
  return requestPostForm(url, data);
}

/**
 * 获取list
 * @param data
 * @returns {Promise.<void>}
 */
export async function getViewList(data){
  let url = config.requestHttp + config.api.viewList;
  return requestGet(url, data);
}

/**
 * 获取详情
 * @param data
 * @returns {Promise.<Response>}
 */
export async function getViewDetails(data){
  let url = config.requestHttp + config.api.viewDetails;
  return requestGet(url, data);
}

/**
 * 删除
 * @param data
 * @returns {Promise.<Response>}
 */
export async function viewDelete(data){
  let url = config.requestHttp + config.api.viewDelete;
  return requestPostUrlData(url, data);
}

/**
 * 复制
 * @param data
 * @returns {Promise.<Response>}
 */
export async function viewCopy(data){
  let url = config.requestHttp + config.api.viewCopy;
  return requestPost(url, data);
}

/**
 * 发送验证码
 * @param data
 * @returns {Promise.<Response>}
 */
export async function sendCaptcha(data){
  let url = config.requestHttp + config.api.sendCaptcha;
  return requestPost(url, data);
}

/**
 * 业务签名
 * @param data
 * @returns {Promise.<Response>}
 */
export async function bizSign(data){
  let url = config.requestHttp + config.api.bizSign;
  return requestPost(url, data);
}
