import { FC, PropsWithChildren } from "react";
import { HomePage } from "./pages/home";
import { makeAuthContextProvider } from "./services/auth";
import { FakeAuthService } from "./adapters/fake-auth";
// import { FirebaseAuthService } from "./adapters/firebase-auth";
// import { AWSAuthService } from "./adapters/aws-amplify-auth";

export const composeProviders =
  (...providers: FC<PropsWithChildren<unknown>>[]) =>
  (Initial: FC) =>
    providers.reduce((acc, Next) => <Next>{acc}</Next>, <Initial />);

// The entry point of the app is the perfect place
// to set up service providers

const AppProviders = composeProviders(
  makeAuthContextProvider(FakeAuthService)
  // makeAuthContextProvider(FirebaseAuthService)
  // makeAuthContextProvider(AWSAuthService)
);

export const App = () => AppProviders(HomePage);
