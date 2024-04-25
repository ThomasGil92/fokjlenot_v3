import { createAppAsyncThunk } from "../createAppAsyncThunk";
import { Project } from "@/adapters/secondary/project/project";
import { projectsGateway } from "@/adapters/secondary/project/projectsGateway";
import { mswProjectRetriever } from "@/adapters/secondary/project/mswProjectsRetriever";
import { Token } from "../auth/auth";
import { Task } from "@/adapters/secondary/task/task";
import { tasksGateway } from "@/adapters/secondary/task/tasksGateway";
import { mswTasksRetriever } from "@/adapters/secondary/task/mswTasksRetriever";

export const getProjectById = createAppAsyncThunk<
  { project: Project; tasks: Task[] },
  { token: Token["access_token"] , projectId: Project["id"] }
>("getProjectById", async ({ token, projectId }) => {
  const project = await projectsGateway(mswProjectRetriever()).getProjectById(
    token,
    projectId,
  );

  const tasks = await tasksGateway(mswTasksRetriever()).getTasksByProjectId(token, projectId);

  return { project, tasks };
});
