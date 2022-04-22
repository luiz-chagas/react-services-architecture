import { User } from "../../models/user";
import { useAuth } from "../../services/auth";

interface Props {
  user: User;
}

export const Content = ({ user }: Props) => {
  const { signOut } = useAuth();

  return (
    <div>
      <p>It's a beautiful day, {user.name}</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};
