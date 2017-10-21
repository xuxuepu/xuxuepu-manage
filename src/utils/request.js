import fetch from 'dva/fetch';

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
  let options = {
    method: 'GET'
  };
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}

/**
 * get请求(数据拼在data后面)
 * @param url
 * @param data
 * @returns {Promise.<Response>}
 */
function requestGetUrlData(url, data) {
  for(let item in data){
    url = url + "/" + data[item];
  }
  let options = {
    method: 'GET'
  };
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
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
    headers: {
      'Accept': 'application/json;charset=utf-8',
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  };
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
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
    body : formData
  };
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}

/**
 * post请求(数据拼在data后面)
 * @param url
 * @param data
 * @returns {Promise.<Response>}
 */
function requestPostUrlData(url, data) {
  let i = 0;
  for(let item in data){
    if(i == 0){
      url = url + "?" + item + "=" + data[item];
    }else{
      url = url + "&" + item + "=" + data[item];
    }
    i++;
  }
  let options = {
    method: 'POST',
    mode: 'cors'
  };
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}

export default {requestGet, requestPost, requestGetUrlData, requestPostForm, requestPostUrlData};
