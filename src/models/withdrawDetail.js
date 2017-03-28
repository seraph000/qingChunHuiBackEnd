
export default {
  namespace: 'withdrawDetail',
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
        if(pathname.toLowerCase() == '/withdraw/withdrawdetail') {
          dispatch({
            type: 'myBread/setBreads',
            breads: ['会员提现管理', '提现详情']
          });
          dispatch({
            type: 'save',
            record: state.record
          })
        }
      });
    }
  },
};
