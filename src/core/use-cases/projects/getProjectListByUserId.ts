import { createAppAsyncThunk } from "../createAppAsyncThunk";
import { Project } from "@/adapters/secondary/project/project";
import { projectsGateway } from "@/adapters/secondary/project/projectsGateway";
import { mswProjectRetriever } from "@/adapters/secondary/project/mswProjectsRetriever";
import { Token } from "../auth/auth";

export const getProjectsListByUserId = createAppAsyncThunk<
  Project[],
  {  token: Token["access_token"]  }
>("getProjectListByUserId", async ({  token }) => {
  const projects_list = await projectsGateway(
    mswProjectRetriever(),
  ).getProjectsByUserId(token);
  return projects_list;
});