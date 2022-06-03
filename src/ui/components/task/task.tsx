import { Task as TaskType } from "../../../models/task";

interface Props {
  task: TaskType;
  onDelete: () => void;
  onToggle: () => void;
}

export const Task = ({ onDelete, onToggle, task }: Props) => {
  return (
    <div style={{ display: "flex", margin: "8px" }}>
      <div
        style={{
          textDecoration: task.complete ? "line-through" : "none",
          flexGrow: 1,
        }}
      >
        {task.name}
      </div>
      <div>{task.description}</div>
      <div>
        <button onClick={onToggle}>
          {task.complete ? "Undo" : "Complete"}
        </button>
        <button style={{ marginLeft: "8px" }} onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};
