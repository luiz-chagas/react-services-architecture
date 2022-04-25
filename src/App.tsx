import { HomePage } from "./pages/home";
import { makeAuthContextProvider } from "./services/auth";
import { FakeAuthService } from "./adapters/fake-auth";
// import { FirebaseAuthService } from "./adapters/firebase-auth";
// import { AWSAuthService } from "./adapters/aws-amplify-auth";

// The entry point of the app is the perfect place
// to set up service providers

const AuthProvider = makeAuthContextProvider(FakeAuthService);
// const AuthProvider = makeAuthContextProvider(FirebaseAuthService);
// const AuthProvider = makeAuthContextProvider(AWSAuthService);

export const App = () => (
  <AuthProvider>
    <HomePage />
  </AuthProvider>
);
