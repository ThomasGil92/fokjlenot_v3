import { createAppAsyncThunk } from "../createAppAsyncThunk";
import { Project } from "@/adapters/secondary/project/project";
import { projectsGateway } from "@/adapters/secondary/project/projectsGateway";
import { Token } from "../auth/auth";
import { dbProjectRetriever } from "@/adapters/secondary/project/dbProjectRetriever";

export const postNewProject = createAppAsyncThunk<
  Project,
  { token: Token["access_token"], newProject: Project }
>("postNewProject", async ({ token, newProject }) => {
  const projects_list = await projectsGateway(
    dbProjectRetriever(),
  ).postNewProject(token, newProject);
  return projects_list;
});
