import { useAuth } from "../../providers/auth-provider";

export const SignIn = () => {
  const { signIn } = useAuth();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <button onClick={() => signIn("Google")}>Sign In with Google</button>
      <button onClick={() => signIn("Facebook")}>Sign In with Facebook</button>
    </div>
  );
};
