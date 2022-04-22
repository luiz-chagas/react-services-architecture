import { AuthService } from "./../services/auth";
import awsConfig from "../aws-exports";
import { Amplify, Auth, Hub } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import { User } from "../models/user";

const init = () => Amplify.configure(awsConfig);
const signIn = () =>
  Auth.federatedSignIn({
    provider: CognitoHostedUIIdentityProvider.Google,
  }).then((res) => void 0);
const signOut = () =>
  Auth.signOut({
    global: true,
  });
const getUser = () =>
  Auth.currentAuthenticatedUser()
    .then(convertUser)
    .catch((err) => null);

const onUserChanged: AuthService["onUserChanged"] = (callback) => {
  Hub.listen("auth", ({ payload: { event, data } }) => {
    if (event === "signIn") {
      const ourUser = convertUser(data);
      return callback(ourUser);
    }
    if (event === "signOut") return callback(null);
  });
};

const convertUser = (awsUser: any): User => {
  return {
    email: awsUser.attributes?.email,
    id: awsUser.username,
    name: awsUser.attributes?.name,
  };
};

export const AWSAuthService: AuthService = {
  init,
  signIn,
  signOut,
  getUser,
  onUserChanged,
};
