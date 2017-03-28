import {getHome} from '../services/homePage.js';

export default {
  namespace: 'homePage',
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
      const {result} = yield call(getHome, {
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
        if(pathname.toLowerCase() == '/homepage') {
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
