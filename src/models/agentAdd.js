
export default {
  namespace: 'agentAdd',
  state: {},
  reducers: {},
  effects: {},
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({pathname}) => {
        if(pathname.toLowerCase() == '/agent/agentadd') {
          dispatch({
            type: 'myBread/setBreads',
            breads: ['代理商管理', '新建代理商']
          });
        }
      });
    }
  },
};
