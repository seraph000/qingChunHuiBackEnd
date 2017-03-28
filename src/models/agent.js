import {getList} from '../services/agent.js';

export default {
  namespace: 'agent',
  state: {
    result: [],
    TotalRecord: 0,
    PageIndex: 0,
    PageSize: 0
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
    *getList({PageIndex, PageSize, keyword}, {call, put}) {
      const {result, page} = yield call(getList, {
        method: 'post',
        headers: {
          'X-Paging': JSON.stringify({
            PageIndex: PageIndex,
            PageSize: PageSize
          }),
          'X-Keyword': keyword
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
        if(pathname.toLowerCase() == '/agent') {
          dispatch({
            type: 'myBread/setBreads',
            breads: ['代理商管理']
          });
          dispatch({
            type: 'getList',
            PageIndex: 1,
            PageSize: 10,
            keyword: ''
          });
        }
      });
    }
  },
};
