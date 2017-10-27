import {getViewList, viewDelete, viewCopy} from './../../services/essay';
export default {

  namespace: 'essayList',

  state: {
    dataItem: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // 监听 history 变化，当进入 `/user` 时触发 `load` action
      return history.listen(({ pathname }) => {
        if (pathname === '/essay/list') {
          dispatch({ type: 'getViewList' });
        }
      });
    }
  },

  effects: {
    //获取列表
    *getViewList({ payload }, { call, put }) {
      yield put({ type: 'showessayListLoading' });
      let res = yield call(getViewList, payload);
      yield put({ type: 'hideessayListLoading' });
      if (Number(res.data.code) == 0) {
        yield put({ type: 'saveessayList', dataItem: res.data.data });
      } else {
        throw res.data;
      }
    },
    //显示手机预览
    *showModal({ _id }, { call, put }){
      yield put({ type: 'showModel', payload: _id});
    },
    //复制
    *viewCopy({ _id }, { call, put }){
      let res = yield call(viewCopy, {_id: _id});
      if (Number(res.data.code) == 0) {
        yield put({ type: 'getViewList'});
      } else {
        throw res.data;
      }
    },
    //删除
    *viewDelete({ _id }, { call, put }){
      let res = yield call(viewDelete, {_id: _id});
      if (Number(res.data.code) == 0) {
        yield put({ type: 'getViewList'});
      } else {
        throw res.data;
      }
    }
  },

  reducers: {
    saveessayList(state, { dataItem }){
      return {
        ...state,
        dataItem: dataItem
      };
    },
    showessayListLoading(state) {
      return {
        ...state,
        loading: true
      };
    },
    hideessayListLoading(state){
      return {
        ...state,
        loading: false
      };
    },
    showModel(state, { payload: _id }){
      return {
        ...state,
        modalVisble: true,
        iframeUrl: 'http://www.xuxuepu.com?_id=' + _id
      };
    },
    hideModel(state){
      return {
        ...state,
        modalVisble: false
      };
    }
  }

};
