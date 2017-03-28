import {getList} from '../services/dailyDetail.js';

export default {
  namespace: 'dailyDetail',
  state: {
    memberFee: 0,
    memberFeeCount: 0,
    poundage: 0,
    poundageCount: 0,
    adminProfitList: [],
    TotalRecord: 0,
    PageIndex: 1,
    PageSize: 10,
  },
  reducers: {
    save(state, {payload}) {
      const {result, page, day} = payload;
      return {
        ...state,
        ...result,
        ...page,
        day
      }
    }
  },
  effects: {
    *getList({day, PageIndex, PageSize}, {call, put}) {
      const {result, page} = yield call(getList, day, {
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
          result, page, day
        }
      })
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({pathname, state}) => {
        if(pathname.toLowerCase() == '/award/dailydetail') {
          dispatch({
            type: 'myBread/setBreads',
            breads: ['提奖管理', '日详情']
          });
          dispatch({
            type: 'getList',
            day: state.day
          })
        }
      })
    }
  },
};
