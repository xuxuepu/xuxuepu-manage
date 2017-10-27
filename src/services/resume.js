import {request, config} from '../utils';
const {requestGet, requestPost} = request;

/**
 * 获取简历详情
 * @param data
 * @returns {Promise.<Response>}
 */
export async function getResumeDetail(data) {
  let url = config.requestHttp + config.api.getResumeDetail;
  return requestGet(url, data);
}

/**
 * 编辑简历详情
 * @param data
 * @returns {Promise.<Response>}
 */
export async function editResume(data) {
  let url = config.requestHttp + config.api.editResume;
  return requestPost(url, data);
}