import { AuthContextProvider } from "./providers/auth-provider";
import { AuthService } from "../services/auth";
import { HomePage } from "./pages/home";
import { StorageService } from "../services/storage";
import { Task } from "../models/task";
import { TaskStorageContextProvider } from "./providers/task-storage-provider";
import { User } from "../models/user";
import { UserStorageContextProvider } from "./providers/user-storage-provider";
import { LoggerContextProvider } from "./providers/logger-provider";
import { LoggerService } from "../services/logger";

// An instance of AuthService is required for our App to work, and that's an explicit requirement
interface Params {
  authService: AuthService;
  loggerService: LoggerService;
  userStorageService: StorageService<User>;
  taskStorageService: StorageService<Task>;
}

export const App = ({
  authService,
  loggerService,
  taskStorageService,
  userStorageService,
}: Params) => (
  <LoggerContextProvider loggerService={loggerService}>
    <AuthContextProvider authService={authService}>
      <UserStorageContextProvider storageService={userStorageService}>
        <TaskStorageContextProvider storageService={taskStorageService}>
          <HomePage />
        </TaskStorageContextProvider>
      </UserStorageContextProvider>
    </AuthContextProvider>
  </LoggerContextProvider>
);
