
export default {
  namespace: 'singleDetail',
  state: {
    record: {}
  },
  reducers: {
    save(state, {record}) {
      return {
        record
      }
    }
  },
  effects: {},
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({pathname, state}) => {
        if(pathname.toLowerCase() == '/award/singledetail') {
          dispatch({
            type: 'myBread/setBreads',
            breads: ['提奖管理', '日详情', '交易详情']
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
