import {request, config} from './../utils';
const {requestGet, requestPost} = request;

/**
 * 获取七牛token
 * @param data
 * @returns {Promise.<Response>}
 */
export async function getQiniuToken(data) {
  let url = config.requestHttp + config.api.getQiniuToken;
  return requestGet(url, data);
}

/**
 * 上传文件到qiniu
 * @param data
 * @returns {Promise.<Response>}
 */
export async function uploadToQiniu(data, file, callback) {
  var xhr = new XMLHttpRequest();
  var formData = new FormData();
  formData.append('token',data.token);
  formData.append('key',data.key);
  formData.append("domain", 'http://up.qiniu.com');
  formData.append('file', file);
  xhr.onreadystatechange = function (e) {
    if(xhr.readyState == 4){
      if(xhr.status == 200){
        typeof callback=='function'?callback(xhr.responseText):true
      }else {
        typeof callback=='function'?callback('服务器错误'):true
      }
    }
  };
  xhr.open('POST', 'http://up.qiniu.com', false);
  xhr.send(formData);
}
