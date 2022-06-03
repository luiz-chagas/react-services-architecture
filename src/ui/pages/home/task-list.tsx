import { useCallback, useEffect, useState } from "react";
import { Task as TaskType } from "../../../models/task";
import { Task } from "../../components/task/task";
import { useTaskStorage } from "../../providers/task-storage-provider";

export const TaskList = () => {
  const { findAll, create, save, remove } = useTaskStorage();

  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [newTask, setNewTask] = useState("");

  const loadTasks = useCallback(() => {
    findAll().then((tasks) => setTasks(tasks));
  }, [findAll]);

  const deleteTask = useCallback(
    (id: string) => {
      remove(id).then(loadTasks);
    },
    [loadTasks, remove]
  );

  const toggleTask = useCallback(
    (task: TaskType) => {
      const newTask: TaskType = { ...task, complete: !task.complete };
      save(newTask).then(loadTasks);
    },
    [loadTasks, save]
  );

  const addTask = useCallback(
    (description: string) => {
      create({
        complete: false,
        createdBy: "user",
        name: description,
        type: "task",
      }).then(() => {
        loadTasks();
        setNewTask("");
      });
    },
    [create, loadTasks]
  );

  useEffect(loadTasks, [loadTasks]);

  return (
    <div>
      Task List
      <div>
        <input
          onChange={(evt) => setNewTask(evt.target.value)}
          value={newTask}
        />
        <button style={{ marginLeft: "8px" }} onClick={() => addTask(newTask)}>
          Add Task
        </button>
      </div>
      <div style={{ marginTop: "24px" }}>
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onDelete={() => deleteTask(task.id)}
            onToggle={() => toggleTask(task)}
          />
        ))}
      </div>
    </div>
  );
};
