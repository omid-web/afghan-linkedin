import { Timestamp } from 'firebase/firestore';

interface LinkedinUser {
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

interface LinkedinState {
  linkedinUser: null | LinkedinUser,
  linkedinUsers: LinkedinUser[],
  loading: boolean,
};

export {
  LinkedinUser,
  LinkedinState
};
