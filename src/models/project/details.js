import { getViewDetails, viewCreate, viewUpdate } from './../../services/project';
import PropTypes from 'prop-types';
import { browserHistory } from 'dva/router';

export default {

  namespace: 'projectDetails',

  state: {
    addEditData: {
      view_type: 'word',
      content: '',
      signs:[]
    },
    actionUrl: ''
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // 监听 history 变化，当进入 `/user` 时触发 `load` action
      return history.listen(({ pathname, query }) => {
        if (pathname === '/project/details') {
          if(query.id){
            dispatch({ type: 'getViewDetails', payload: {_id: query.id} });
          }
        }
      });
    }
  },

  effects: {
    *changeTabs({ e }, { call, put }){
      yield put({ type: 'saveTabsValue', key: e });
    },
    *getViewDetails({ payload }, { call, put }) {
      let res = yield call(getViewDetails, payload);
      if (Number(res.data.code) == 0) {
        yield put({ type: 'saveProjectDetails', details: res.data.data });
        console.log(PropTypes);
      } else {
        throw res.data;
      }
    },
    //提交
    *handleSubmit({ payload }, { call, put, select }){
      let ad = yield select(state => state.projectDetails.addEditData);

      if(ad.view_type == 'word'){
        if(!UE.getEditor("content").getContent()){
          throw { message: '请输入内容!' };
        }
      }else{
        let s = document.getElementById('fileInput').value;
        if(s == ""){
          throw { message: '请选择文件!' };
        }

      }

      let data = document.getElementById("myForm");
      let d = {};
      d.title = data.title.value;
      d.view_type = data.view_type.value;
      d.title = data.title.value;
      if(data._id.value){
        d._id = data._id.value;
      }
      if(data.content){
        d.content = data.content.value;
      }
      if(data.excel_file){
        d.excel_file = data.excel_file.files[0];
      }

      let res = yield call(d._id ? viewUpdate : viewCreate, d);
      if (Number(res.data.code) == 0) {
        browserHistory.go(-1);
      } else {
        throw res.data;
      }
    }
  },

  reducers: {
    saveProjectDetails(state, { details }) {
      return { ...state,
        addEditData: details
      };
    },
    saveTabsValue(state, { key }){
      let ad = state.addEditData;
      ad.view_type = key;
      return { ...state,
        addEditData: ad
      };
    }
  }

};
