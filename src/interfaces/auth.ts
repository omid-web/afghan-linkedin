import { User } from 'firebase/auth';

export interface AuthState {
  user: null | User;
  loading: boolean;
};
