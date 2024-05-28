import { createAppAsyncThunk } from "../createAppAsyncThunk";
import { Token } from "../auth/auth";
import { Task } from "@/adapters/secondary/task/task";
import { tasksGateway } from "@/adapters/secondary/task/tasksGateway";
import { dbTasksRetriever } from "@/adapters/secondary/task/dbTasksRetriever";

export const updateTask = createAppAsyncThunk<
  Task,
  { token: Token["access_token"]; updatedTask: Task }
>("update_task", async ({ token, updatedTask }) => {
  
  const updated_task_list = await tasksGateway(dbTasksRetriever()).updateTask(
    token,
    updatedTask,
  );
  return updated_task_list;
});
