import {getList, pass, notPass, reTry, done} from '../services/withdraw.js';

export default {
  namespace: 'withdraw',
  state: {
    autoAuditing: false,
    withdrawalsAdminList: [],
    TotalRecord: 0,
    PageIndex: 0,
    PageSize: 0
  },
  reducers: {
    save(state, {payload}) {
      const {result, page} = payload;
      return {
        ...state,
        ...result,
        ...page
      }
    }
  },
  effects: {
    *getList({withdrawalsType, PageIndex, PageSize, keyword}, {call, put}) {
      const {result, page} = yield call(getList, withdrawalsType, {
        method: 'post',
        headers: {
          'X-Paging': JSON.stringify({
            PageIndex: PageIndex,
            PageSize: PageSize
          }),
          'X-Keyword': keyword ? keyword : ''
        }
      });
      yield put({
        type: 'save',
        payload: {
          result,
          page
        }
      });
    },
    *pass({id}, {call, put}) {
      const {result} = yield call(pass, id, {
        method: 'post'
      });
      yield put({
        type: 'withdrawDetail/save',
        record: result
      });
    },
    *notPass({id}, {call, put}) {
      const {result} = yield call(notPass, id, {
        method: 'post'
      });
      yield put({
        type: 'withdrawDetail/save',
        record: result
      });
    },
    *reTry({id}, {call, put}) {
      const {result} = yield call(reTry, id, {
        method: 'post'
      });
      yield put({
        type: 'withdrawDetail/save',
        record: result
      });
    },
    *done({id}, {call, put}) {
      const {result} = yield call(done, id, {
        method: 'post'
      });
      yield put({
        type: 'withdrawDetail/save',
        record: result
      });
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({pathname}) => {
        if(pathname.toLowerCase() == '/withdraw') {
          dispatch({
            type: 'myBread/setBreads',
            breads: ['会员提现管理']
          });
          dispatch({
            type: 'getList',
            withdrawalsType: '',
            PageIndex: 1,
            PageSize: 10,
            keyword: ''
          });
        }
      });
    }
  },
};
