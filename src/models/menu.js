import {getMenu} from '../services/menu.js';

export default {
  namespace: 'menu',
  state: {},
  reducers: {
    save(state, {payload}) {
      const {result} = payload;
      return {
        result
      }
    }
  },
  effects: {
    *getMenu(state, {put, call}) {
      const {result} = yield call(getMenu, {
        method: 'get'
      });
      yield put({
        type: 'save',
        payload: {
          result
        }
      });
    }
  },
  subscriptions: {},
};
