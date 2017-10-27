import { getResumeDetail, editResume } from './../../services/resume';
import { routerRedux } from 'dva/router'

export default {

  namespace: 'resumeMy',

  state: {
    loginLoading: false,
    addEditData: {}
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // 监听 history 变化，当进入 `/login` 时触发 `load` action
      return history.listen(({ pathname }) => {
        if(pathname == '/resume/my'){
          dispatch({ type: 'getResumeDetail'});
        }
      });
    }
  },

  effects: {
    //获取简历详情
    *getResumeDetail({}, { call, put }) {
      yield put({ type: 'showLoading' });
      let res = yield call(getResumeDetail, {
        id: 1
      });
      yield put({ type: 'hideLoading' });
      if (!res.code) {
        yield put({ type: 'saveAddEditData', addEditData: res.data });
      } else {
        throw res.data;
      }
    },
    //编辑我的简历
    *editResume({ data }, { call, put }){
      if(!UE.getEditor("content").getContent()){
        throw { message: '请输入内容!' };
      }

      let myData = document.getElementById("myForm");
      data.content = myData.content.value;

      yield put({ type: 'saveAddEditData', addEditData: data });

      yield put({ type: 'showLoading' });
      let res = yield call(editResume, {
        id: 1,
        ...data
      });
      yield put({ type: 'hideLoading' });
      if (!res.code) {
        
      } else {
        throw res.data;
      }
    }
  },

  reducers: {
    showLoading (state) {
      return {
        ...state,
        loading: true
      }
    },
    hideLoading (state) {
      return {
        ...state,
        loading: false
      }
    },
    saveAddEditData(state, { addEditData }){
      return {
        ...state,
        addEditData: addEditData
      }
    }
  }
};
