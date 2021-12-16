import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    count: 10,
    msg: 'Welcome',
  },
  mutations: {
    increment: state => state.count++,
    decrement: state => state.count--,
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()],
});
