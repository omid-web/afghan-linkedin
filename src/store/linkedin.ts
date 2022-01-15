import {
  collection,
  query,
  orderBy,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';

import authStore from '@store/auth';
import { db } from '@services/firebase';
import linkedinService from '@services/linkedin';
import { LinkedinState, LinkedinUser } from '@interfaces/linkedin';
import { useLoading } from '@/loading';

const loading = useLoading();

const linkedinStore = defineStore('linkedin', {
  state: () => {
    const state: LinkedinState = {
      linkedinUser: null,
      linkedinUsers: [],
      loading: false,
    };
    return state;
  },
  getters: {
    getUser(state): LinkedinUser | null {
      return state.linkedinUser;
    },
    getAllUsers(state): LinkedinUser[] {
      return state.linkedinUsers;
    }
  },
  actions: {
    async getUser() {
      try {
        this.loading = true;
        const auth = authStore();
        const docRef = doc(db, `users`, `${auth.user?.uid}`)
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData: LinkedinUser = {
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
            createdAt: docSnap.data().createdAt,
          }
          this.linkedinUser = userData;
        }
      } finally {
        this.loading = false;
      }
    },
    async getAllUsers() {
      try {
        this.loading = true;
        let linkedinUsers: LinkedinUser[] = [];
        const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        for (const doc of querySnapshot.docs) {
          // @ts-ignore
          const userData: LinkedinUser = {
            displayName:doc.data().displayName,
            email:doc.data().email,
            profilePic:doc.data().profilePic,
            jobTitle:doc.data().jobTitle,
            industry:doc.data().industry,
            whoCanContact:doc.data().whoCanContact,
            bio:doc.data().bio,
            linkedin:doc.data().linkedin,
            facebook:doc.data().facebook,
            twitter:doc.data().twitter,
            instagram:doc.data().instagram,
            createdAt:doc.data().createdAt,
          }
          linkedinUsers.push(userData);
        }
        this.linkedinUsers = linkedinUsers;
      } finally {
        this.loading = false;
      }
    },
    async setLinkedin(code: string) {
      try {
        this.loading = true;
        const auth = authStore();
        const linkedinRes = await linkedinService.getLinkedinInfo(code);
        const docRef = doc(db, `users`, `${auth.user?.uid}`);
        this.linkedinUser = {
          displayName: linkedinRes.data.name,
          email: linkedinRes.data.email,
          jobTitle: '',
          industry: '',
          whoCanContact: '',
          bio: '',
          profilePic: linkedinRes.data.profilePic,
          linkedin: '',
          facebook: '',
          instagram: '',
          twitter: '',
          createdAt: serverTimestamp(),
        }
        await setDoc(docRef, this.linkedinUser)
      } finally {
        this.loading = false;
      }
    },
    async updateLinkedin(linkedinUser: LinkedinUser) {
      try {
        this.loading = true;
        const auth = authStore();
        const docRef = doc(db, `users`, `${auth.user?.uid}`)
        await updateDoc(docRef, { linkedinUser })
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

export default linkedinStore;
