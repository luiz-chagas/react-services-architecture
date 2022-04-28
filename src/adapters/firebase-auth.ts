// Adapters have no idea this is a react application
// All they care about is conforming to the interface AuthService

import {
  User as FirebaseUser,
  GoogleAuthProvider,
  getAuth,
  signInWithRedirect,
  FacebookAuthProvider,
  AuthProvider as FirebaseAuthProvider,
} from "firebase/auth";
import { getApps, initializeApp } from "firebase/app";
import { User } from "../models/user";
import { AuthErrors, AuthProviders, AuthService } from "../services/auth";

const firebaseConfig = {
  apiKey: "AIzaSyClXdQIt9upmTwCMMNzlBnz3jWZRqi8rg8",
  authDomain: "fir-login-1d61d.firebaseapp.com",
  projectId: "fir-login-1d61d",
  appId: "1:332925839805:web:c0ef0d261b468bdb4d0ad4",
  measurementId: "G-JCT9H5M586",
};

const initializeFirebase: AuthService["init"] = () => {
  if (getApps().length === 0) {
    initializeApp(firebaseConfig);
  }
};

// This function translates a FirebaseUser to the User type our
// application has defined, so no FirebaseUser types will
// ever leak into our application
const transformUser = (user: FirebaseUser): User => ({
  id: user.uid,
  email: user.email,
  name: user.displayName ?? "Visitor",
});

const getUser: AuthService["getUser"] = async () => {
  const firebaseUser = getAuth().currentUser;

  if (!firebaseUser) return null;

  return transformUser(firebaseUser);
};

const onUserChanged: AuthService["onUserChanged"] = (callback) =>
  getAuth().onAuthStateChanged((maybeFirebaseUser) => {
    if (!maybeFirebaseUser) return callback(null);
    return callback(transformUser(maybeFirebaseUser));
  });

const signIn: AuthService["signIn"] = async (provider) => {
  const providerList: Record<AuthProviders, FirebaseAuthProvider> = {
    Facebook: new FacebookAuthProvider(),
    Google: new GoogleAuthProvider(),
  };

  const selectedProvider = providerList[provider];

  if (!selectedProvider) throw Error(AuthErrors.InvalidProdiver);

  return signInWithRedirect(getAuth(), selectedProvider);
};

const signOut: AuthService["signOut"] = () => getAuth().signOut();

export const FirebaseAuthService: AuthService = {
  getUser,
  init: initializeFirebase,
  onUserChanged,
  signIn,
  signOut,
};
