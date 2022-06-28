import { User } from "../../models/user";
import { makeStorageProvider } from "./generic-storage-provider";

export const [UserStorageContextProvider, useUserStorage] =
  makeStorageProvider<User>("User");
