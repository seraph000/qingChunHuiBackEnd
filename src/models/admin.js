import {getList} from '../services/admin.js';

export default {
  namespace: 'admin',
  state: {
    result: [],
    TotalRecord: 0,
    PageIndex: 1,
    PageSize: 10
  },
  reducers: {
    save(state, {payload}) {
      const {result, page} = payload;
      return {
        ...state,
        result,
        ...page
      }
    }
  },
  effects: {
    *getList({PageIndex, PageSize}, {call, put}) {
      const {result, page} = yield call(getList, {
        method: 'post',
        headers: {
          'X-Paging': JSON.stringify({
            PageIndex: PageIndex,
            PageSize: PageSize
          })
        }
      });
      yield put({
        type: 'save',
        payload: {
          result, page
        }
      });
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({pathname}) => {
        if(pathname.toLowerCase() == '/config/admin') {
          dispatch({
            type: 'myBread/setBreads',
            breads: ['系统管理', '管理员管理']
          });
          dispatch({
            type: 'getList',
            PageIndex: 1,
            PageSize: 10
          })
        }
      });
    }
  },
};
