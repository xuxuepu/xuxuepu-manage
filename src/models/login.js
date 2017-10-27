import { login } from './../services/login';
import { routerRedux } from 'dva/router'

export default {

  namespace: 'login',

  state: {
    loginLoading: false
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // 监听 history 变化，当进入 `/login` 时触发 `load` action
      return history.listen(({ pathname }) => {
        //dispatch({ type: 'isLogin' });
      });
    }
  },

  effects: {
    *login({ payload }, { call, put }) {
      let phone = payload.phone;
      let password = payload.password;
      if (!phone || !password) {
        throw { message: '用户名或密码不能为空!' };
      }
      yield put({ type: 'showLoginLoading' });
      //登录
      let res = yield call(login, {
        phone: phone,
        password: password
      });
      yield put({ type: 'hideLoginLoading' });
      if (!res.code) {
        yield put(routerRedux.push('/essay/list'));
      } else {
        throw res.data;
      }
    },
  },

  reducers: {
    showLoginLoading (state) {
      return {
        ...state,
        loginLoading: true
      }
    },
    hideLoginLoading (state) {
      return {
        ...state,
        loginLoading: false
      }
    }
  }
};
