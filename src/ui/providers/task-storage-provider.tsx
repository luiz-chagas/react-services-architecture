import { Task } from "../../models/task";
import { makeStorageProvider } from "./generic-storage-provider";

export const {
  ContextProvider: TaskStorageContextProvider,
  useStorage: useTaskStorage,
} = makeStorageProvider<Task>("Task");
