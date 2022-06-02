import { HomePage } from "./pages/home";
import { AuthService } from "../services/auth";
import { AuthContextProvider } from "./providers/auth-provider";

// An instance of AuthService is required for our App to work, and that's an explicit requirement
interface Params {
  authService: AuthService;
}

export const App = ({ authService }: Params) => (
  <AuthContextProvider authService={authService}>
    <HomePage />
  </AuthContextProvider>
);
