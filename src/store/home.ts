import {
  collection,
  query,
  orderBy,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
  Timestamp,
  serverTimestamp,
  limit,
  onSnapshot
} from 'firebase/firestore';

import authStore from '@store/auth';
import newApiService from '@services/newsapi';
import { db } from '@services/firebase';
import { HomeState, Post, Article } from '@interfaces/home';
import { useLoading } from '@/loading';

const loading = useLoading();

const homeStore = defineStore('homeStore', {
  state: () => {
    const state: HomeState = {
      articles: [],
      posts: [],
      loading: false,
    };
    return state;
  },
  getters: {
    getArticles: (state) => state.articles.slice(0, 5),
    getPosts: (state) => state.posts,
  },
  actions: {
    async setArticles() {
      try {
        this.loading = true;
        const articles = await newApiService.getTopNews()
        this.articles = await articles.data.articles;
      } finally {
        this.loading = false;
      }
    },
    async setPost(text: string) {
      try {
        this.loading = true;
        const auth = authStore();
        console.log('%chome.ts line:52 aut.user', 'color: #007acc;', auth.user);
        // @ts-ignore
        const { photoURL, uid, displayName, email } = auth.user;
        await addDoc(collection(db, "posts"), {
          email: email,
          displayName: displayName,
          userId: uid,
          userPhotoURL: photoURL,
          text: text,
          createdAt: serverTimestamp()
        });
      } finally {
        this.loading = false;
      }
    },
    async setPosts() {
      try {
        this.loading = true;
        loading.start();
        const q = query(collection(db, "posts"), orderBy("createdAt", "desc"), limit(50));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          let posts: Post[] = [];
          for (const doc of querySnapshot.docs) {
            const post: Post = {
              displayName: doc.data().displayName,
              email: doc.data().email,
              userPhotoURL: doc.data().userPhotoURL,
              text: doc.data().text,
              createdAt: doc.data()?.createdAt?.toDate().toString().substring(0, 24),
            }
            posts.push(post);
          }
          this.posts = posts;
        });
      } finally {
        this.loading = false;
        loading.end();
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

export default homeStore;
