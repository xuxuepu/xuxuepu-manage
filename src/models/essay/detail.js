import { getEssayDetail, addEssay, editEssay } from './../../services/essay';
import PropTypes from 'prop-types';
import { browserHistory } from 'dva/router';

export default {

  namespace: 'essayDetail',

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
        if (pathname === '/essay/detail') {
          if(query.id){
            dispatch({ type: 'getEssayDetail', payload: {id: query.id} });
          }
        }
      });
    }
  },

  effects: {
    //获取文章详情
    *getEssayDetail({ payload }, { call, put }) {
      let res = yield call(getEssayDetail, payload);
      if (Number(res.code) == 0) {
        yield put({ type: 'saveEssayDetail', detail: res.data });
      } else {
        throw res.data;
      }
    },
    //提交
    *handleSubmit({ payload }, { call, put, select }){
      let ad = yield select(state => state.essayDetail.addEditData);

      if(!UE.getEditor("content").getContent()){
        throw { message: '请输入内容!' };
      }

      let data = document.getElementById("myForm");
      let d = {};
      d.title = data.title.value;
      d.author = data.author.value;
      d.description = data.description.value;
      if(data.id.value){
        d.id = data.id.value;
      }
      if(data.content){
        d.content = data.content.value;
      }

      yield put({ type: 'saveEssayDetail', detail: d });

      let res = yield call(d.id ? editEssay : addEssay, d);
      if (!res.code) {
        browserHistory.go(-1);
      } else {
        throw res.data;
      }
    }
  },

  reducers: {
    saveEssayDetail(state, { detail }) {
      return { ...state,
        addEditData: detail
      };
    }
  }

};
