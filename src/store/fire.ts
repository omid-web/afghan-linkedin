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
  updateDoc,
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
  jobTitle: string,
  industry: string,
  whoCanContact: string,
  bio: string,
  profilePic: string,
  linkedin: string,
  facebook: string,
  twitter: string,
  instagram: string,
  createdAt: Timestamp,
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
    setLinkedinUser: (state, linkedinUser) => state.linkedinUser = linkedinUser,
  },
  actions: {
    setUser({ commit }, user) {
      commit('setUser', user);
    },
    async setLinkedin({ commit }, code) {
      console.log('%cfire.ts line:81 code', 'color: #007acc;', code);
      await axios.post("http://localhost:7220/linkedin-sso-response", {
        code: code,
        redirectUri: 'http://localhost:3000/profile'
      })
      .then(res => {
        console.log('%cfire.ts line:86 res', 'color: #007acc;', res);
        const docRef = doc(db, `users`, `${this.state.user?.uid}`)
        setDoc(docRef, {
          displayName: res.data.name,
          email: res.data.email,
          jobTitle: '',
          industry: 'none',
          whoCanContact: '',
          bio: '',
          profilePic: res.data.profilePic,
          linkedin: '',
          facebook: '',
          instagram: '',
          twitter: '',
          createdAt: serverTimestamp(),
        });
      }).catch(err => {
        throw err;
      });
    },
    async updateLinkedin({ commit }, linkedinUser) {
      const docRef = doc(db, `users`, `${this.state.user?.uid}`)
      updateDoc(docRef, {
        displayName: linkedinUser.displayName,
        email: linkedinUser.email,
        jobTitle: linkedinUser.jobTitle,
        industry: linkedinUser.industry,
        whoCanContact: linkedinUser.whoCanContact,
        bio: linkedinUser.bio,
        linkedin: linkedinUser.linkedin,
        facebook: linkedinUser.facebook,
        twitter: linkedinUser.twitter,
        instagram: linkedinUser.instagram,
        createdAt: serverTimestamp()
      }).then(() => {
        commit('setLinkedinUser', linkedinUser);
      })
    },
    async getLinkedin({ commit }) {
      const docRef = doc(db, `users`, `${this.state.user?.uid}`)
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData: linkedinUser = {
          displayName: docSnap.data().displayName,
          email: docSnap.data().email,
          profilePic: docSnap.data().profilePic,
          jobTitle: docSnap.data().jobTitle,
          industry: docSnap.data().industry,
          whoCanContact: docSnap.data().whoCanContact,
          bio: docSnap.data().bio,
          linkedin: docSnap.data().linkedin,
          facebook: docSnap.data().facebook,
          twitter: docSnap.data().twitter,
          instagram: docSnap.data().instagram,
          createdAt: docSnap.data().createdAt
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
            email: doc.data().email,
            userName: doc.data().userName,
            userPhotoURL: doc.data().userPhotoURL,
            userId: doc.data().userId,
            text: doc.data().text,
            createdAt: doc.data().createdAt.toDate()
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
        email: email,
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