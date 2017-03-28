import {getList} from '../services/user.js';

export default {
  namespace: 'user',
  state: {
    memberCount: 0,
    unMemberCount: 0,
    userCount: 0,
    userList: [],
    TotalRecord: 0,
    PageIndex: 1,
    PageSize: 10
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
    *getList({isMember, PageIndex, PageSize, keyword}, {call, put}) {
      const {result, page} = yield call(getList, isMember, {
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
          result, page
        }
      })
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({pathname}) => {
        if(pathname.toLowerCase() == '/user' || pathname.toLowerCase() == '/tenant/user') {
          dispatch({
            type: 'myBread/setBreads',
            breads: ['用户管理']
          });
          dispatch({
            type: 'getList',
            isMember: '',
            PageIndex: 1,
            PageSize: 10,
            keyword: ''
          });
        }
      });
    }
  },
};
