import { User } from "./user";

export interface Task {
  id: string;
  name: string;
  description?: string;
  complete: boolean;
  createdBy: User["id"];
  type: "task";
}
