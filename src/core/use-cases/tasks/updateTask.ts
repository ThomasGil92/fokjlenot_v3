import { createAppAsyncThunk } from "../createAppAsyncThunk";
import { Token } from "../auth/auth";
import { Task } from "@/adapters/secondary/task/task";
import { tasksGateway } from "@/adapters/secondary/task/tasksGateway";
import { mswTasksRetriever } from "@/adapters/secondary/task/mswTasksRetriever";

export const updateTask = createAppAsyncThunk<
  Task[],
  { token: Token["access_token"]; updatedTask: Task }
>("update_task_status", async ({ token, updatedTask }) => {
  const updated_task_list = await tasksGateway(mswTasksRetriever()).updateTask(
    token,
    updatedTask,
  );
  return updated_task_list;
});
