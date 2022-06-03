// Adapters have no idea this is a react application
// All they care about is conforming to the interface AuthService

import { AuthService } from "../services/auth";

const fakeUser = {
  email: "luiz@luiz.com",
  id: "123",
  name: "Luiz Chagas",
  type: "user" as const,
};

let userChangedCB: Parameters<AuthService["onUserChanged"]>[0] = () => void 0;

// IDEA: Save the user object to localStorage on signIn
// so login persist after refreshing the page
export const FakeAuthService: AuthService = {
  getUser: () => Promise.resolve(null),
  init: () => Promise.resolve(),
  onUserChanged: (callback) => {
    userChangedCB = callback;
    callback(null);
    return () => void 0;
  },
  signIn: async () =>
    new Promise((resolve) => {
      setTimeout(() => {
        userChangedCB(fakeUser);
        resolve(fakeUser);
      }, 1000);
    }),
  signOut: async () => {
    userChangedCB(null);
  },
};
