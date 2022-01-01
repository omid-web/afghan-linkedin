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
  serverTimestamp,
  Timestamp,
  limit,
} from 'firebase/firestore';
import {
  User
} from 'firebase/auth';
import axios from 'axios';

import { db } from '@/services/firebase';

type linkedinUser = {
  displayName: string,
  email: string,
  profilePic: string,
  timestamp: Timestamp
};

type FireState = {
  user: null | User,
  linkedinUser: null | linkedinUser,
  linkedinUsers: linkedinUser[],
  messages: any[]
};

const fireStore = createStore({
  state: () => {
    const state: FireState = {
      user: null,
      linkedinUser: null,
      linkedinUsers: [],
      messages: []
    };
    return state;
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getLinkedinUser(state) {
      return state.linkedinUser;
    },
    getLinkedinUsers(state) {
      return state.linkedinUsers;
    },
    logged(state) : boolean {
      return Boolean(state.linkedinUser);
    },
  },
  mutations: {
    setUser: (state, user) => state.user = user,
  },
  actions: {
    setUser({ commit }, user) {
      commit('setUser', user);
    },
    async setLinkedin({ commit }, { code }) {
      await axios.post("http://localhost:7220/linkedin-sso-response", {
        code: code,
        redirectUri: 'http://localhost:3000'
      })
      .then(res => {
        const docRef = doc(db, `users`, `${this.state.user?.uid}`)
        setDoc(docRef, {
          displayName: res.data.name,
          email: res.data.email,
          profilePic: res.data.profilePic,
          timestamp: serverTimestamp()
        });
      }).catch(err => {
        throw err;
      });
    },
    async getLinkedin({ commit }) {
      const docRef = doc(db, `users`, `${this.state.user?.uid}`)
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData: linkedinUser = {
          displayName: docSnap.data().displayName,
          email: docSnap.data().email,
          profilePic: docSnap.data().profilePic,
          timestamp: docSnap.data().timestamp
        }
        this.state.linkedinUser = userData;
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    },
    async getAllLinkedin({ commit }) {
      let linkedinUsers: linkedinUser[] = [];
      const querySnapshot = await getDocs(collection(db, "users"));
      for (const doc of querySnapshot.docs) {
        const userData: linkedinUser = {
          displayName: doc.data().displayName,
          email: doc.data().email,
          profilePic: doc.data().profilePic,
          timestamp: doc.data().timestamp
        }
        linkedinUsers.push(userData);
      }
      this.state.linkedinUsers = linkedinUsers;
    },
    async getMessages({ commit }) {
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"), limit(10))
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messages = [];
        for (const doc of querySnapshot.docs) {
          const message = {
            userName: doc.data().userName,
            userPhotoURL: doc.data().userPhotoURL,
            userId: doc.data().userId,
            text: doc.data().text
          }
          messages.push(message);
        }
        this.state.messages = messages;
        console.log('%cfire.ts line:132 messages', 'color: #007acc;', messages);
      })
    },
    async sendMessage({ commit }, text) {
      const { photoURL, uid, displayName } = this.state.user;

      await addDoc(collection(db, "messages"), {
        userName: displayName,
        userId: uid,
        userPhotoURL: photoURL,
        text: text,
        createdAt: serverTimestamp()
      });
    }
  },
  modules: {},
  plugins: [createPersistedState()],
});

export default fireStore;