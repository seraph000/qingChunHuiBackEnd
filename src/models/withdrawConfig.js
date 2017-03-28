import {getWithdrawalsSetting} from '../services/withdrawConfig.js';

export default {
  namespace: 'withdrawConfig',
  state: {
    originalPoundage: 0,
    poundage: 0,
    withdrawalsStartDay: 0,
    withdrawalsEndDay: 0,
    withdrawalsLower: 0,
    withdrawalsUpper: 0,
    withdrawalsTotal: 0,
    withdrawalsDaily: 0,
  },
  reducers: {
    save(state, {payload}) {
      const {result} = payload;
      return {
        ...state,
        ...result
      }
    }
  },
  effects: {
    *getSetting(state, {call, put}) {
      const {result} = yield call(getWithdrawalsSetting, {
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
        if(pathname.toLowerCase() == '/config/withdrawconfig') {
          dispatch({
            type: 'myBread/setBreads',
            breads: ['系统管理', '提现设置']
          });
          dispatch({
            type: 'getSetting'
          });
        }
      });
    }
  },
};
