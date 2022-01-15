import {
  collection,
  query,
  orderBy,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
} from 'firebase/firestore';

import authStore from '@store/auth';
import { db } from '@services/firebase';
import { BusinessState, Business } from '@interfaces/business';
import { useLoading } from '@/loading';

const loading = useLoading();

const businessStore = defineStore('business', {
  state: () => {
    const state: BusinessState = {
      business: null,
      businesses: [],
      loading: false,
    };
    return state;
  },
  getters: {
    getBusiness(state): Business | null {
      return state.business;
    },
    getAllBusinesses(state): Business[] {
      return state.businesses;
    }
  },
  actions: {
    async getBusiness() {
      try {
        this.loading = true;
        const auth = authStore();
        const docRef = doc(db, `Businesses`, `${auth.user.uid}`)
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const businessData = {
            displayName: docSnap.data().displayName,
            website: docSnap.data().website,
            location: docSnap.data().location,
            email: docSnap.data().email,
            industry: docSnap.data().industry,
            description: docSnap.data().description,
            linkedin: docSnap.data().linkedin,
            facebook: docSnap.data().facebook,
            twitter: docSnap.data().twitter,
            instagram: docSnap.data().instagram,
            createdAt: docSnap.data().createdAt,
          }
          this.business = businessData;
        }
      } finally {
        this.loading = false;
      }
    },
    async getAllBusinesses() {
      try {
        this.loading = true;
        let businesses: Business[] = [];
        const q = query(collection(db, "businesses"), orderBy("displayName", "desc"));
        const querySnapshot = await getDocs(q);
        for (const doc of querySnapshot.docs) {
          // @ts-ignore
          const businessData: Business = {
            displayName: doc.data().displayName,
            website: doc.data().website,
            location: doc.data().location,
            email: doc.data().email,
            industry: doc.data().industry,
            description: doc.data().description,
            linkedin: doc.data().linkedin,
            facebook: doc.data().facebook,
            twitter: doc.data().twitter,
            instagram: doc.data().instagram,
            createdAt: doc.data().createdAt,
          }
          businesses.push(businessData);
        }
        this.businesses = businesses;
      } finally {
        this.loading = false;
      }
    },
    async updateBusiness(businessData: Business) {
      try {
        this.loading = true;
        const docRef = doc(db, `Businesses`, `${this.state.user?.uid}`)
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          await updateDoc(docRef, { businessData })
        } else {
          await setDoc(docRef, businessData);
        }
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

export default businessStore;
