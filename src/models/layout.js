import { isLogin, logOut } from './../services/login';
import { routerRedux } from 'dva/router';
import { config } from './../utils';

export default {

  namespace: 'layout',

  state: {
    loginLoading: false
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // 监听 history 变化，当进入 `/login` 时触发 `load` action
      return history.listen(({ pathname }) => {
        dispatch({ type: 'isLogin', pathname: pathname });
      });
    }
  },

  effects: {
    //判断是否登录
    *isLogin({ pathname }, { call, put }) {
      let res = yield call(isLogin);
      if (!res.code) {
        yield put({ type: 'saveLoginInfo', payload: res.data });
        if(pathname == '/' || pathname == '/login'){
          yield put(routerRedux.push('/essay/list'));
        }
      } else {
        if(pathname != '/' && pathname != '/login'){
          yield put(routerRedux.replace('/'));
        }
      }
    },
    //登出
    *logOut({},{ call, put }){
      let res = yield call(logOut);
      if (!res.code) {
        yield put(routerRedux.push('/'));
      } else {
        throw res.data;
      }
    }
  },

  reducers: {
    saveLoginInfo(state, { payload: data }) {
      return {
        ...state,
        loginInfo: data
      };
    }
  }
};
