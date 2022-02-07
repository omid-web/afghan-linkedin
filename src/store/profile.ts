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
  Timestamp,
} from 'firebase/firestore';

import authStore from '@store/auth';
import { db } from '@services/firebase';
import linkedinService from '@services/linkedin';
import { ProfileState, Profile } from '@interfaces/profile';
import { useLoading } from '@/loading';

const loading = useLoading();

const profileStore = defineStore('profileStore', {
  state: () => {
    const state: ProfileState = {
      profile: {
        displayName: '',
        email: '',
        jobTitle: '',
        industry: '',
        whoCanContact: '',
        bio: '',
        profilePic: '',
        linkedin: '',
        facebook: '',
        twitter: '',
        instagram: '',
        createdAt: Timestamp.now(),
      },
      profiles: [],
      loading: false,
    };
    return state;
  },
  getters: {
    getProfile: (state) => state.profile,
    getProfiles: (state) => state.profiles,
  },
  actions: {
    async initalizeProfile(code: string) {
      try {
        this.loading = true;
        const auth = authStore();
        const docRef = doc(db, `users`, `${auth.user?.uid}`);

        const linkedinRes = await linkedinService.getLinkedinInfo(code);
        this.profile = {
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

        await setDoc(docRef, this.profile)
      } finally {
        this.loading = false;
      }
    },
    async setProfile() {
      try {
        this.loading = true;
        loading.start();
        const auth = authStore();
        const docRef = doc(db, `users`, `${auth.user?.uid}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData: Profile = {
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
          this.profile = userData;
        }
      } finally {
        this.loading = false;
        loading.end();
      }
    },
    async setProfiles() {
      try {
        this.loading = true;
        loading.start();
        let profiles: Profile[] = [];
        const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        for (const doc of querySnapshot.docs) {
          // @ts-ignore
          const userData: profile = {
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
          profiles.push(userData);
        }
        this.profiles = profiles;
      } finally {
        this.loading = false;
        loading.end();
      }
    },
    async updateProfile(profile: Profile) {
      try {
        this.loading = true;
        const auth = authStore();
        const docRef = doc(db, `users`, `${auth.user?.uid}`)
        await updateDoc(docRef, { ...profile })
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

export default profileStore;
