import { User } from "../models/user";

// AuthProviders we want to support
export type AuthProviders = "Google" | "Facebook";

// This is what external adapters have to implement
// Make sure this interface will fulfill all the needs of the application
export interface AuthService {
  getUser: () => Promise<User | null>;
  init: () => void;
  onUserChanged: (callback: UserChangedEventCallback) => UnsubscribeFn;
  signIn: (provider: AuthProviders) => Promise<void>;
  signOut: () => Promise<void>;
  // Other functions to consider: signUp, updateUser, deleteAccount, resetPassword, setUpMFA, etc
}
type UnsubscribeFn = () => void;

export const AuthErrors = {
  ServiceNotSetUp: "Auth Service has not been set up",
  InvalidProdiver: "Provider not supported",
};

type UserChangedEventCallback = (x: User | null) => void;
