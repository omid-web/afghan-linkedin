interface Profile {
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
  createdAt: any,
};

interface ProfileState {
  profile: Profile,
  profiles: Profile[],
  loading: boolean,
};

export {
  Profile,
  ProfileState
};
