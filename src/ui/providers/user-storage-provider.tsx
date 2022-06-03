import { User } from "../../models/user";
import { makeStorageProvider } from "./generic-storage-provider";

export const {
  ContextProvider: UserStorageContextProvider,
  useStorage: useUserStorage,
} = makeStorageProvider<User>("User");
