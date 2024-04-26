import { createAppAsyncThunk } from "../createAppAsyncThunk";
import { Token } from "../auth/auth";
import { Task } from "@/adapters/secondary/task/task";
import { tasksGateway } from "@/adapters/secondary/task/tasksGateway";
import { mswTasksRetriever } from "@/adapters/secondary/task/mswTasksRetriever";

export const postNewTask = createAppAsyncThunk<
  Task[],
  { token: Token["access_token"]; newTask: Task }
>("postNewtask", async ({ token, newTask }) => {
  const new_task_list = await tasksGateway(
    mswTasksRetriever(),
  ).postNewTask(token, newTask);
  return new_task_list;
});
