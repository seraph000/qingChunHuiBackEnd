import {getList} from '../services/role.js';

export default {
  namespace: 'role',
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
    *getList(state, {call, put}) {
      const {result} = yield call(getList, {
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
        if(pathname.toLowerCase() == '/config/role') {
          dispatch({
            type: 'myBread/setBreads',
            breads: ['系统管理', '角色管理']
          });
          dispatch({
            type: 'getList'
          });
        }
      });
    }
  },
};
