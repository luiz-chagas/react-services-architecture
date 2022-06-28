import { Task } from "../../models/task";
import { makeStorageProvider } from "./generic-storage-provider";

export const [TaskStorageContextProvider, useTaskStorage] =
  makeStorageProvider<Task>("Task");
