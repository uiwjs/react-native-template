export default {
  state: {
    token: null,
    apihost: null,
  },
  reducers: {
    update: (state, payload) => ({ ...state, ...payload }),
  },
  effects: {
  },
};
