// This file connects an AuthService object with
// the React context our application is going to use
// It doesn't matter where the service is coming from (firebase, fake, aws, etc)

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  PropsWithChildren,
  FC,
} from "react";
import { User } from "../models/user";

// This is what external adapters have to implement
export type UserChangedEventCallback = (x: User | null) => void;
export interface AuthService {
  getUser: () => Promise<User | null>;
  init: () => void;
  onUserChanged: (callback: UserChangedEventCallback) => void;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

// This is what our React components will consume
interface AuthServiceContext {
  currentUser: User | null;
  isLoading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

// We need to set up a default context
const AuthContext = createContext<AuthServiceContext>({
  signIn: async () => {
    throw Error("Auth Service has not been set up");
  },
  signOut: async () => {
    throw Error("Auth Service has not been set up");
  },
  currentUser: null,
  isLoading: true,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const makeAuthContextProvider = (serviceProvider: AuthService) => {
  serviceProvider.init();

  const Provider: FC<PropsWithChildren<unknown>> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      serviceProvider.onUserChanged((maybeUser) => {
        setIsLoading(false);
        setUser(maybeUser);
      });
    }, []);

    useEffect(() => {
      serviceProvider.getUser().then((maybeUser) => {
        setIsLoading(false);
        setUser(maybeUser);
      });
    }, []);

    const value: AuthServiceContext = useMemo(
      () => ({
        currentUser: user,
        isLoading: isLoading,
        signIn: () => {
          setIsLoading(true);
          return serviceProvider.signIn();
        },
        signOut: serviceProvider.signOut,
      }),
      [isLoading, user]
    );

    return (
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
  };

  return Provider;
};
