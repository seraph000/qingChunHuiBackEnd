
export default {
  namespace: 'myBread',
  state: {
    breads: []
  },
  reducers: {
    setBreads(state, {breads}) {
      return {
        ...state,
        breads
      }
    }
  },
  effects: {},
  subscriptions: {},
};
