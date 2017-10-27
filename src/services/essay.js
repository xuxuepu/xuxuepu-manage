import {request, config} from '../utils';
const {requestGet} = request;

/**
 * 新增详情
 * @param data
 * @returns {Promise.<Response>}
 */
export async function viewCreate(data){
  let url = config.requestHttp + config.api.viewCreate;
  return requestPostForm(url, data);
}

