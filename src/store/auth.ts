import {
  GoogleAuthProvider,
  signInWithRedirect,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  User,
  AuthProvider,
} from 'firebase/auth';
import { auth } from '@services/firebase';
import { AuthState } from '@interfaces/auth';
import { LoadingBar } from 'quasar'

LoadingBar.setDefaults({
  color: 'red',
  size: '3px',
  position: 'top'
});

const authStore = defineStore('auth', {
  state: () => {
    const state: AuthState = {
      user: null,
      loading: false,
    };
    return state;
  },
  getters: {
    getUser(state): User | null {
      return state.user;
    },
    logged(state) : boolean {
      return Boolean(state.user);
    },
    loadingStatus(state) : boolean {
      return state.loading;
    },
  },
  actions: {
    init() {
      return new Promise((resolve) => {
        onAuthStateChanged(auth, (updatedUser) => {
          this.loading = false;
          if (updatedUser) {
            this.user = updatedUser;
            resolve(updatedUser);
          } else {
            this.user = null;
            resolve(null);
          }
        });
      });
    },
    async signInWithGoogle() {
      const provider = new GoogleAuthProvider();
      await this.loginWithRedirect(provider);
    },
    async loginWithRedirect(provider: AuthProvider) {
      try {
        this.loading = true;
        await signInWithRedirect(auth, provider);
      } finally {
        this.loading = false;
      }
    },
    async register(displayName: string, email: string, password: string) {
      try {
        this.loading = true;
        const res = await createUserWithEmailAndPassword(auth, email, password);
        if (res.user) {
          updateProfile(res.user, {
            displayName: displayName
          });
        }
      } finally {
        this.loading = false;
      }
    },
    async loginWithEmailAndPassword(email: string, password: string) {
      try {
        this.loading = true;
        await signInWithEmailAndPassword(auth, email, password);
      } finally {
        this.loading = false;
      }
    },
    async logout() {
      this.loading = true;
      await signOut(auth);
      this.loading = false;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: sessionStorage,
      },
    ],
  },
});

export default authStore;
