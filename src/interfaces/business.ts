import { Timestamp } from 'firebase/firestore';

interface Business {
  displayName: string,
  website: string,
  location: string,
  email: string,
  industry: string,
  description: string,
  linkedin: string,
  facebook: string,
  twitter: string,
  instagram: string,
  createdAt: Timestamp,
};

interface BusinessState {
  business: null | Business,
  businesses: Business[],
  loading: boolean,
};

export {
  Business,
  BusinessState
};
