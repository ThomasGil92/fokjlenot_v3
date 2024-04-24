import { createAppAsyncThunk } from "../createAppAsyncThunk";
import { Project } from "@/adapters/secondary/project/project";
import { projectsGateway } from "@/adapters/secondary/project/projectsGateway";
import { mswProjectRetriever } from "@/adapters/secondary/project/mswProjectsRetriever";
import { Token } from "../auth/auth";

export const getProjectById = createAppAsyncThunk<
  Project,
  {  token: Token["access_token"] | null,projectId:Project["id"] }
>("getProjectById", async ({  token,projectId }) => {
  const project = await projectsGateway(
    mswProjectRetriever(),
  ).getProjectById( token,projectId);
  return project;
});
