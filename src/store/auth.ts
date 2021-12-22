import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import firebaseInstance from '@/services/firebase';

type AuthState = {
  user: null | User;
  email: string;
  displayName: string;
};

const auth = getAuth(firebaseInstance);

const authStore = createStore({
  state: () => {
    const state: AuthState = {
      user: null,
      email: '',
      displayName: '',
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
          this.state.email = email;
          this.state.displayName = displayName;
          updateProfile(user, {
            displayName: displayName
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
          this.state.email = email;
          this.state.displayName = res.user.displayName;
        } else {
          this.state.user = null;
        }
      })
      .catch((err) => {
        alert(err.message)
      })
    },
    async loginWithPopup() {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    },
    async logout() {
      await signOut(auth);
    },
  },
  modules: {},
  plugins: [createPersistedState()],
});

export default authStore;
