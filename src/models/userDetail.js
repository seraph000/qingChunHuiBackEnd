
export default {
  namespace: 'userDetail',
  state: {
    record: {}
  },
  reducers: {
    save(state, {record}) {
      return {
        ...state,
        record
      }
    }
  },
  effects: {},
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({pathname, state}) => {
        if(pathname.toLowerCase() == '/user/userdetail') {
          dispatch({
            type: 'myBread/setBreads',
            breads: ['用户管理', '用户详情']
          });
          dispatch({
            type: 'save',
            record: state.record
          });
        }
      });
    }
  },
};
