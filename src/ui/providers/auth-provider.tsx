// This file connects an AuthService instance with
// the React context our application is going to use
// It doesn't matter where the service is coming from (firebase, aws, fake implementation, etc)

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  PropsWithChildren,
  useCallback,
} from "react";
import { User } from "../../models/user";
import { AuthErrors, AuthProviders, AuthService } from "../../services/auth";

// This is what React components/hooks will consume
interface AuthServiceContext {
  currentUser: User | null;
  isLoading: boolean;
  signIn: (provider: AuthProviders) => Promise<User | null>;
  signOut: () => Promise<void>;
}

// Create the context
const AuthContext = createContext<AuthServiceContext | null>(null);

interface ProviderParams {
  authService: AuthService;
}

export const AuthContextProvider = ({
  authService,
  children,
}: PropsWithChildren<ProviderParams>) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    authService.init();
  }, [authService]);

  useEffect(() => {
    const unsubscribe = authService.onUserChanged((maybeUser) => {
      setIsLoading(false);
      setUser(maybeUser);
    });
    // Return unsubscribe function to be called in case this context ever gets unmounted
    return unsubscribe;
  }, [authService]);

  useEffect(() => {
    authService.getUser().then((maybeUser) => {
      setIsLoading(false);
      setUser(maybeUser);
    });
  }, [authService]);

  const signIn = useCallback(
    async (provider: AuthProviders) => {
      setIsLoading(true);
      const maybeUser = await authService.signIn(provider);
      setUser(maybeUser);
      return maybeUser;
    },
    [authService]
  );

  const value: AuthServiceContext = useMemo(
    () => ({
      currentUser: user,
      isLoading,
      signIn,
      signOut: authService.signOut,
    }),
    [authService.signOut, isLoading, signIn, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (ctx === null) {
    throw Error(AuthErrors.ServiceNotSetUp);
  }

  return ctx;
};
