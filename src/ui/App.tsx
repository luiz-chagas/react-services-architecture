import { AuthContextProvider } from "./providers/auth-provider";
import { AuthService } from "../services/auth";
import { HomePage } from "./pages/home";
import { StorageService } from "../services/storage";
import { Task } from "../models/task";
import { TaskStorageContextProvider } from "./providers/task-storage-provider";
import { User } from "../models/user";
import { UserStorageContextProvider } from "./providers/user-storage-provider";

// An instance of AuthService is required for our App to work, and that's an explicit requirement
interface Params {
  authService: AuthService;
  userStorageService: StorageService<User>;
  taskStorageService: StorageService<Task>;
}

export const App = ({
  authService,
  userStorageService,
  taskStorageService,
}: Params) => (
  <AuthContextProvider authService={authService}>
    <UserStorageContextProvider storageService={userStorageService}>
      <TaskStorageContextProvider storageService={taskStorageService}>
        <HomePage />
      </TaskStorageContextProvider>
    </UserStorageContextProvider>
  </AuthContextProvider>
);
