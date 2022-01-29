import {
  GoogleAuthProvider,
  signInWithRedirect,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  AuthProvider,
} from 'firebase/auth';
import { auth } from '@services/firebase';
import { AuthState } from '@interfaces/auth';
import { useLoading } from '@/loading';

const loading = useLoading();

const authStore = defineStore('auth', {
  state: () => {
    const state: AuthState = {
      user: null,
      loading: false,
    };
    return state;
  },
  getters: {
    getUser: (state) => state.user,
    getLogged: (state) => Boolean(state.user),
    getLoading: (state) => state.loading,
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
      try{
        this.loading = true;
        await signOut(auth);
      } finally {
        this.loading = false;
      }
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
