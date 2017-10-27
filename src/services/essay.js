import { request, config } from '../utils';
const { requestGet, requestPost } = request;

/**
 * 获取文章列表
 * @param data
 * @returns {Promise.<Response>}
 */
export async function getEssayList(data){
  let url = config.requestHttp + config.api.getEssayList;
  return requestGet(url, data);
}

/**
 * 获取文章详情
 * @param data
 * @returns {Promise.<Response>}
 */
export async function getEssayDetail(data){
  let url = config.requestHttp + config.api.getEssayDetail;
  return requestGet(url, data);
}

/**
 * 新增文章详情
 * @param data
 * @returns {Promise.<Response>}
 */
export async function addEssay(data){
  let url = config.requestHttp + config.api.addEssay;
  return requestPost(url, data);
}

/**
 * 修改文章详情
 * @param data
 * @returns {Promise.<Response>}
 */
export async function editEssay(data){
  let url = config.requestHttp + config.api.editEssay;
  return requestPost(url, data);
}

/**
 * 删除文章
 * @param data
 * @returns {Promise.<Response>}
 */
export async function deleteEssay(data){
  let url = config.requestHttp + config.api.deleteEssay;
  return requestPost(url, data);
}

