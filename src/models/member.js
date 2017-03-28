import {getMemberSetting} from '../services/member.js';

export default {
  namespace: 'member',
  state: {
    memberOriginalPrice: 0,
    memberPrice: 0,
    t0Fee: 0,
    t1Fee: 0,
    shareFee: 0,
    parentFee: 0
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
      const {result} = yield call(getMemberSetting, {
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
        if(pathname.toLowerCase() == '/config/member') {
          dispatch({
            type: 'myBread/setBreads',
            breads: ['系统管理', '会员设置']
          });
          dispatch({
            type: 'getSetting'
          })
        }
      });
    }
  },
};
