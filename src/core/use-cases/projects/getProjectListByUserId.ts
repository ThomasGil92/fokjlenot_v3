import { createAppAsyncThunk } from "../createAppAsyncThunk";
import { Project, UserId } from "@/adapters/secondary/project/project";
import { projectsGateway } from "@/adapters/secondary/project/projectsGateway";
import { Token } from "../auth/auth";
import { dbProjectRetriever } from "@/adapters/secondary/project/dbProjectRetriever";

export const getProjectsListByUserId = createAppAsyncThunk<
  Project[],
  { token: Token["access_token"]; userId: UserId }
>("getProjectListByUserId", async ({ token, userId }) => {
  const projects_list = await projectsGateway(
    dbProjectRetriever(),
  ).getProjectsByUserId(token, userId);
  return projects_list;
});
