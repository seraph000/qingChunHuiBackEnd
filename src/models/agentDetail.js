
export default {
  namespace: 'agentDetail',
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
        if(pathname.toLowerCase() == '/agent/agentdetail') {
          dispatch({
            type: 'myBread/setBreads',
            breads: ['代理商管理', '代理商详情']
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
