import {getTenantMainPage} from './../../services/homePage.js';

export default {
  namespace: 'tenantHomePage',
  state: {
    result: {}
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
    *getHome(state, {call, put}) {
      const {result} = yield call(getTenantMainPage, {
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
        if(pathname.toLowerCase() == '/tenant/home') {
          dispatch({
            type: 'myBread/setBreads',
            breads: ['']
          });
          dispatch({
            type: 'getHome'
          });
        }
      });
    }
  },
};
