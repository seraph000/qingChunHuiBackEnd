import {getPermissionList} from '../services/role.js';

export default {
  namespace: 'roleAdd',
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
    },
    getRecord(state, {record}) {
      return {
        result: [],
        record
      }
    }
  },
  effects: {
    *getPermissionList({record}, {call, put}) {
      const{result} = yield call(getPermissionList, {
        method: 'post'
      });
      yield put({
        type: 'save',
        payload: {
          result, record
        }
      });
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({pathname, state}) => {
        if(pathname.toLowerCase() == '/config/role/roleadd') {
          dispatch({
            type: 'myBread/setBreads',
            breads: ['系统管理', '角色管理', '角色编辑']
          });
          dispatch({
            type: 'getRecord',
            record: state.record
          });
          dispatch({
            type: 'getPermissionList',
            record: state.record
          });
        }
      });
    }
  },
};
