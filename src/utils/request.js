import fetch from 'dva/fetch';
import config from './config';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

//处理发送前事件
function beforesendHandling(url, data){
    config.isPrintLog ? console.log("【上送url】：\n", url, "\n【上送的数据】：\n", data) : true;
}

//处理完成事件
function completeHandling(data) {
    config.isPrintLog ? console.log("【返回的数据】：\n", data) : true;
    return data;
}

//处理错误事件
function errHandling(err){
    config.isPrintLog ? console.log("【错误信息】：\n", err) : true;
    return {
      code: 520,
      message: '服务器异常，正在努力抢修中'
    };
}

/**
 * get请求
 * @param url
 * @param data
 * @returns {Promise.<Response>}
 */
function requestGet(url, data) {
  let i = 0;
  for(let item in data){
    if(i == 0){
      url = url + "?" + item + "=" + data[item];
    }else{
      url = url + "&" + item + "=" + data[item];
    }
    i++;
  }

  beforesendHandling(url, data );//处理发送前事件

  let options = {
    method: 'GET',
    mode: 'cors',
    credentials: 'include'
  };
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => (completeHandling(data)))
    .catch(err => (errHandling(err)));
}

/**
 * post请求
 * @param url
 * @param data
 * @returns {Promise.<Response>}
 */
function requestPost(url, data) {
  let options = {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Accept': 'application/json;charset=utf-8',
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  };

  beforesendHandling(url, data );//处理发送前事件

  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => (completeHandling(data)))
    .catch(err => (errHandling(err)));
}

/**
 * post请求(form提交)
 * @param url
 * @param data
 * @returns {Promise.<Response>}
 */
function requestPostForm(url, data) {
  let formData = new FormData();
  for(let item in data){
    formData.append(item, data[item]);
  }
  let options = {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    body : formData
  };

  beforesendHandling(url, data );//处理发送前事件

  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => (completeHandling(data)))
    .catch(err => (errHandling(err)));
}

export default {requestGet, requestPost, requestPostForm};
