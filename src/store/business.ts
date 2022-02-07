import {
  collection,
  query,
  orderBy,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
  Timestamp,
} from 'firebase/firestore';

import authStore from '@store/auth';
import { db } from '@services/firebase';
import { BusinessState, Business } from '@interfaces/business';
import { useLoading } from '@/loading';

const loading = useLoading();

const auth = authStore();

const businessStore = defineStore('businessStore', {
  state: () => {
    const state: BusinessState = {
      business: {
        displayName: 'business',
        website: '',
        location: '',
        email: '',
        industry: '',
        description: '',
        linkedin: '',
        facebook: '',
        twitter: '',
        instagram: '',
        createdAt: Timestamp.now()
      },
      businesses: [],
      loading: false,
    };
    return state;
  },
  getters: {
    getBusiness: (state) => state.business,
    getBusinesses: (state) => state.businesses,
  },
  actions: {
    async setBusiness() {
      try {
        this.loading = true;
        const docRef = doc(db, `businesses`, `${auth.user?.uid}`)
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
    async setBusinesses() {
      try {
        this.loading = true;
        loading.start();
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
        loading.end();
      }
    },
    async updateBusiness(businessData: Business) {
      try {
        this.loading = true;
        const docRef = doc(db, `businesses`, `${auth.user?.uid}`)
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          await updateDoc(docRef, { ...businessData })
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
