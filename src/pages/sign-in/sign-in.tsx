import { useAuth } from "../../services/auth";

export const SignIn = () => {
  const { signIn } = useAuth();

  return (
    <div>
      <button onClick={signIn}>Sign In</button>
    </div>
  );
};
