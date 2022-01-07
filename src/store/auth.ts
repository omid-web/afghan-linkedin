import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from '@/services/firebase';
import fireStore from '@store/fire';
import { AuthState } from '@/types';
import { useLoading } from '@/loading'

const loading = useLoading();

const authStore = createStore({
  state: () => {
    const state: AuthState = {
      user: null,
      loading: false
    };
    return state;
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    logged(state) : boolean {
      return Boolean(state.user);
    },
  },
  mutations: {
    setUser: (state, user) => state.user = user,
  },
  actions: {
    init({ commit }) {
      return new Promise((resolve) => {
        onAuthStateChanged(auth, (updatedUser) => {
          if (updatedUser) {
            fireStore.dispatch('setUser', updatedUser);
            commit('setUser', updatedUser);
          } else {
            fireStore.dispatch("resetState");
            commit('setUser', null);
            resolve(null);
          };
        });
      });
    },
    async register({ commit }, { displayName, email, password }) {
      loading.start();
      await createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const user = res.user;
        if (user) {
          this.state.user = user;
          updateProfile(user, {
            displayName: displayName
          }).then(() => {
            fireStore.dispatch('registerUser', user)
          })
        }
      })
      .catch((err) => {
        alert(err.code + err.message);
      })
      loading.end();
    },
    async login({ commit }, { email, password }) {
      loading.start();
      await signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        if (res.user) {
          this.state.user = res.user;
          fireStore.dispatch('getLinkedin');
        } else {
          this.state.user = null;
        }
      })
      .catch((err) => {
        alert(err.code + err.message);
      })
      loading.end();
    },
    async signInWithGoogle() {
      const provider = new GoogleAuthProvider();
      try {
        loading.start();
        await signInWithRedirect(auth, provider)
      } finally {
        loading.end();
      }
    },
    async logout() {
      await signOut(auth)
      .then(() => {})
      .catch((err) => {
        alert(err.code + err.message);
      });
    },
  },
  modules: {},
  plugins: [createPersistedState()],
});

export default authStore;
