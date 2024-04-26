import { createAppAsyncThunk } from "../createAppAsyncThunk";
import { Token } from "../auth/auth";
import { Task, TaskStatus } from "@/adapters/secondary/task/task";
import { tasksGateway } from "@/adapters/secondary/task/tasksGateway";
import { mswTasksRetriever } from "@/adapters/secondary/task/mswTasksRetriever";

export const updateTaskStatus = createAppAsyncThunk<
  Task[],
  { token: Token["access_token"], taskId: Task["id"],newStatus:TaskStatus }
>("update_task_status", async ({ token, taskId,newStatus }) => {
  const updated_task_list = await tasksGateway(
    mswTasksRetriever(),
  ).updateTaskStatus(token, taskId, newStatus);
  return updated_task_list;
});
