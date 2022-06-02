// This page has no idea if useAuth is set up
// with Firebase or Fake-Auth or something else
// and it really shouldn't matter

import { useAuth } from "../../providers/auth-provider";
import { Loading } from "../../components/loading/loading";
import { SignIn } from "../sign-in";
import { Content } from "./content";

export const HomePage = () => {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) return <Loading />;

  if (!currentUser) {
    // In a real application we would redirect users to
    // the SignIn page URL
    return <SignIn />;
  }

  return <Content user={currentUser} />;
};
