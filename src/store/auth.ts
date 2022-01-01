import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithRedirect,
  onAuthStateChanged,
  signOut,
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  getRedirectResult
} from 'firebase/auth';
import { auth } from '@/services/firebase';
import fireStore from '@store/fire';

type AuthState = {
  user: null | User;
  loading: boolean;
};

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
  mutations: {},
  actions: {
    init() {
      return new Promise((resolve) => {
        onAuthStateChanged(auth, (updatedUser) => {
          if (updatedUser) {
            fireStore.dispatch('setUser', updatedUser);
            fireStore.dispatch('getLinkedin');
            this.state.user = updatedUser;
          } else {
            this.state.user = null;
            resolve(null);
          };
        });
      });
    },
    async register({ commit }, { displayName, email, password }) {
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
        alert(err.message);
      })
    },
    async login({ commit }, { email, password }) {
      await signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        if (res.user) {
          this.state.user = res.user;
        } else {
          this.state.user = null;
        }
      })
      .catch((err) => {
        alert(err.code + err.message);
      })
    },
    async signInWithGoogle() {
      const provider = new GoogleAuthProvider();
      try {
        this.state.loading = true;
        await signInWithRedirect(auth, provider)
      } finally {
        this.state.loading = false;
      }
    },
    async logout() {
      await signOut(auth)
      .then(() => {
        alert('sign out successful');
      })
      .catch((err) => {
        alert(err.code + err.message);
      });
    },
  },
  modules: {},
  plugins: [createPersistedState()],
});

export default authStore;
