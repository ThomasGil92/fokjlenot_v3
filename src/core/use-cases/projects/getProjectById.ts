import { createAppAsyncThunk } from "../createAppAsyncThunk";
import { Project } from "@/adapters/secondary/project/project";
import { projectsGateway } from "@/adapters/secondary/project/projectsGateway";
import { Token } from "../auth/auth";
import { Task } from "@/adapters/secondary/task/task";
import { tasksGateway } from "@/adapters/secondary/task/tasksGateway";
import { dbProjectRetriever } from "@/adapters/secondary/project/dbProjectRetriever";
import { dbTasksRetriever } from "@/adapters/secondary/task/dbTasksRetriever";

export const getProjectById = createAppAsyncThunk<
  { project: Project; tasks: Task[] },
  { token: Token["access_token"] , projectId: Project["id"] }
>("getProjectById", async ({ token, projectId }) => {
  const project = await projectsGateway(dbProjectRetriever()).getProjectById(
    token,
    projectId,
  );

  const tasks = await tasksGateway(dbTasksRetriever()).getTasksByProjectId(token, projectId);

  return { project, tasks };
});
