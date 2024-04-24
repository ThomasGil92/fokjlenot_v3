import { createAppAsyncThunk } from "../createAppAsyncThunk";
import { Project } from "@/adapters/secondary/project/project";
import { projectsGateway } from "@/adapters/secondary/project/projectsGateway";
import { mswProjectRetriever } from "@/adapters/secondary/project/mswProjectsRetriever";
import { Token } from "../auth/auth";

export const postNewProject = createAppAsyncThunk<
  Project[],
  { token: Token["access_token"], newProject: Project }
>("postNewProject", async ({ token, newProject }) => {
  const projects_list = await projectsGateway(
    mswProjectRetriever(),
  ).postNewProject(token, newProject);
  return projects_list;
});
