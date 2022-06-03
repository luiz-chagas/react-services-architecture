import { User } from "../../../models/user";
import { useAuth } from "../../providers/auth-provider";
import { TaskList } from "./task-list";

interface Props {
  user: User;
}

export const Content = ({ user }: Props) => {
  const { signOut } = useAuth();

  return (
    <div style={{ width: "100%" }}>
      <div>
        <p>These are your tasks, {user.name}</p>
        <button onClick={signOut}>Sign Out</button>
      </div>
      <div style={{ marginTop: "24px" }}>
        <TaskList />
      </div>
    </div>
  );
};
