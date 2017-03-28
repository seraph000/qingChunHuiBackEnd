import {getSelectList} from '../services/admin.js';

export default {
  namespace: 'adminAdd',
  state: {
    result: []
  },
  reducers: {
    save(state, {payload}) {
      const {result} = payload;
      return {
        ...state,
        result
      }
    }
  },
  effects: {
    *getSelectList(state, {call, put}) {
      const {result} = yield call(getSelectList, {
        method: 'post'
      });
      yield put({
        type: 'save',
        payload: {
          result
        }
      })
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({pathname}) => {
        if(pathname.toLowerCase() == '/config/admin/adminadd') {
          dispatch({
            type: 'myBread/setBreads',
            breads: ['系统管理', '管理员管理', '编辑管理员']
          });
          dispatch({
            type: 'getSelectList'
          });
        }
      });
    }
  },
};
