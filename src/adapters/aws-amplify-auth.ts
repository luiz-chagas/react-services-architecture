import { AuthErrors, AuthProviders, AuthService } from "./../services/auth";
import awsConfig from "../aws-exports";
import { Amplify, Auth, Hub } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import { User } from "../models/user";

// This function translates a Cognito User to the User type our
// application has defined, so no Cognito User types will
// ever leak into our application
const convertUser = (awsUser: any): User => {
  return {
    email: awsUser.attributes?.email,
    id: awsUser.username,
    name: awsUser.attributes?.name,
    type: "user",
  };
};

const init: AuthService["init"] = () => {
  Amplify.configure(awsConfig);
  return Promise.resolve();
};

const signIn: AuthService["signIn"] = async (provider) => {
  const providerList: Record<AuthProviders, CognitoHostedUIIdentityProvider> = {
    Facebook: CognitoHostedUIIdentityProvider.Facebook,
    Google: CognitoHostedUIIdentityProvider.Google,
  };
  const selectedProvider = providerList[provider];

  if (!selectedProvider) throw Error(AuthErrors.InvalidProdiver);

  return Auth.federatedSignIn({
    provider: selectedProvider,
  })
    .then(() => Auth.currentAuthenticatedUser())
    .then(convertUser);
};

const signOut: AuthService["signOut"] = () =>
  Auth.signOut({
    global: true,
  });

const getUser: AuthService["getUser"] = () =>
  Auth.currentAuthenticatedUser()
    .then(convertUser)
    .catch((err) => null);

const onUserChanged: AuthService["onUserChanged"] = (callback) =>
  Hub.listen("auth", ({ payload: { event, data } }) => {
    if (event === "signIn") {
      const ourUser = convertUser(data);
      return callback(ourUser);
    }
    if (event === "signOut") return callback(null);
  });

export const AWSAuthService: AuthService = {
  init,
  signIn,
  signOut,
  getUser,
  onUserChanged,
};
