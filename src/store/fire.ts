import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import {
  addDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  setDoc,
  getDoc,
  getDocs,
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
  createdAt: Timestamp
};

type FireState = {
  user: null | User,
  linkedinUser: null | linkedinUser,
  linkedinUsers: linkedinUser[],
  messages: any[],
  ideas: any[]
};

const fireStore = createStore({
  state: () => {
    const state: FireState = {
      user: null,
      linkedinUser: null,
      linkedinUsers: [],
      messages: [],
      ideas: []
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
          createdAt: serverTimestamp()
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
          createdAt: docSnap.data().timestamp
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
          createdAt: doc.data().timestamp
        }
        linkedinUsers.push(userData);
      }
      this.state.linkedinUsers = linkedinUsers;
    },
    async getMessages({ commit }) {
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"), limit(100))
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
        this.state.messages = messages.reverse();
      })
    },
    async sendMessage({ commit }, text) {
      // @ts-ignore
      const { photoURL, uid, displayName } = this.state.user;

      await addDoc(collection(db, "messages"), {
        userName: displayName,
        userId: uid,
        userPhotoURL: photoURL,
        text: text,
        createdAt: serverTimestamp()
      });
    },
    async getIdeas({ commit }) {
      const q = query(collection(db, "ideas"), orderBy("createdAt", "desc"), limit(100))
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const ideas = [];
        for (const doc of querySnapshot.docs) {
          const idea = {
            userName: doc.data().userName,
            userPhotoURL: doc.data().userPhotoURL,
            userId: doc.data().userId,
            text: doc.data().text
          }
          ideas.push(idea);
        }
        this.state.ideas = ideas;
      })
    },
    async sendIdea({ commit }, text) {
      // @ts-ignore
      const { photoURL, uid, displayName, email } = this.state.user;

      await addDoc(collection(db, "ideas"), {
        userName: displayName,
        userId: uid,
        email: email,
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