import { Timestamp } from 'firebase/firestore';

interface Post {
  displayName: string,
  email: string,
  userPhotoURL: string,
  text: string,
  createdAt: Timestamp
}

interface Article {
  image: {
    url: string
  },
  isBreakingNews: boolean,
  name: string,
  newsSearchUrl: string,
  webSearchUrl: string
}

interface HomeState {
  posts: Post[],
  articles: Article[],
  loading: boolean
}

export {
  Post,
  Article,
  HomeState
};
