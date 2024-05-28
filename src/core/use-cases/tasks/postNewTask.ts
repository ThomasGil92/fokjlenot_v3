import { createAppAsyncThunk } from "../createAppAsyncThunk";
import { Token } from "../auth/auth";
import { Task } from "@/adapters/secondary/task/task";
import { tasksGateway } from "@/adapters/secondary/task/tasksGateway";
import { dbTasksRetriever } from "@/adapters/secondary/task/dbTasksRetriever";

export const postNewTask = createAppAsyncThunk<
  Task,
  { token: Token["access_token"]; newTask: Partial<Task> }
>("postNewtask", async ({ token, newTask }) => {
  const new_task_list = await tasksGateway(
    dbTasksRetriever(),
  ).postNewTask(token, newTask);
  return new_task_list;
});
