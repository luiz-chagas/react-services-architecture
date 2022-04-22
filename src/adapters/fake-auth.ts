// Adapters have no idea this is a react application
// All they care about is conforming to the interface AuthService

import { User } from "../models/user";
import { AuthService } from "../services/auth";

const fakeUser = {
  email: "luiz@luiz.com",
  id: "123",
  name: "Luiz Chagas",
};

let contextCallback: (x: User | null) => void = () => void 0;

export const FakeAuthService: AuthService = {
  getUser: () => Promise.resolve(null),
  init: () => void 0,
  onUserChanged: (callback) => {
    contextCallback = callback;
    callback(null);
  },
  signIn: async () => {
    setTimeout(() => {
      contextCallback(fakeUser);
    }, 1000);
  },
  signOut: async () => {
    contextCallback(null);
  },
};
