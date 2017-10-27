import {getEssayList, deleteEssay} from './../../services/essay';
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
          dispatch({ type: 'getEssayList' });
        }
      });
    }
  },

  effects: {
    //获取列表
    *getEssayList({ payload }, { call, put }) {
      yield put({ type: 'showEssayListLoading' });
      let res = yield call(getEssayList, payload);
      yield put({ type: 'hideEssayListLoading' });
      if (Number(res.code) == 0) {
        yield put({ type: 'saveEssayList', dataItem: res.data });
      } else {
        throw res.data;
      }
    },
    //删除
    *deleteEssay({ id }, { call, put }){
      let res = yield call(deleteEssay, {id: id});
      if (Number(res.data.code) == 0) {
        yield put({ type: 'getEssayList'});
      } else {
        throw res.data;
      }
    }
  },

  reducers: {
    saveEssayList(state, { dataItem }){
      return {
        ...state,
        dataItem: dataItem
      };
    },
    showEssayListLoading(state) {
      return {
        ...state,
        loading: true
      };
    },
    hideEssayListLoading(state){
      return {
        ...state,
        loading: false
      };
    }
  }

};
