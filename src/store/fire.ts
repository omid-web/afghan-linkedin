import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import {
  getFirestore,
  addDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  setDoc,
  getDoc,
  getDocs,
  where,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '@/services/firebase';

const fireStore = createStore({
  state: {
    user: null,
    count: 0,
    msg: 'Welcome',
  },
  mutations: {
    increment: state => state.count++,
    decrement: state => state.count--,
    setUser: (state, user) => state.user = user,
    registerUser(state, user) {
      const userRef = doc(db, 'users', `${user.uid}`)
      setDoc(userRef, {
        displayName: user.displayName,
        email: user.email,
        timestamp: serverTimestamp()
      });
      state.user = user;
    },
    setCount(state, count) {
      const countRef = doc(db, `users`, `${state.user?.uid}`, 'count', `0`);
      setDoc(countRef, {
        count, timestamp: serverTimestamp()
      });
    },
    async getCount(state) {
      const countRef = doc(db, `users`, `${state.user?.uid}`, `count`, `0`);
      const count = await getDoc(countRef);
      if (count.exists()) {
        state.count = count.data().count;
      }
    }
  },
  actions: {
    setUser({ commit }, user) {
      commit('setUser', user);
    },
    registerUser({ commit }, user) {
      commit('registerUser', user);
    },
    setCount({ commit }, count) {
      commit('setCount', count);
    },
    getCount({ commit }) {
      commit('getCount');
    }
  },
  getters: {},
  modules: {},
  plugins: [createPersistedState()],
});

export default fireStore;
