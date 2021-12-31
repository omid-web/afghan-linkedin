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
import axios from 'axios';

import { db } from '@/services/firebase';

const fireStore = createStore({
  state: {
    user: null,
  },
  getters: {
    logged(state) : boolean {
      return Boolean(state.user);
    }
  },
  mutations: {
    setUser: (state, user) => state.user = user,
    async setLinkedin(state, code) {
      await axios.post("http://localhost:7220/linkedin-sso-response", {
        code: code,
        redirectUri: 'http://localhost:3000/connect'
      })
      .then(res => {
        console.log('%cfire.ts line:59 state.user', 'color: #007acc;', state.user);
        console.log('%cfire.ts line:60 res', 'color: #007acc;', res);
        const linkedinRef = doc(db, `users`, `${state.user?.uid}`)
        setDoc(linkedinRef, {
          displayName: res.data.name,
          email: res.data.email,
          profilePic: res.data.profilePic,
          timestamp: serverTimestamp()
        });
      }).catch(err => {
        throw err;
      });
    }
  },
  actions: {
    setUser({ commit }, user) {
      commit('setUser', user);
    },
  },
  modules: {},
  plugins: [createPersistedState()],
});

export default fireStore;
