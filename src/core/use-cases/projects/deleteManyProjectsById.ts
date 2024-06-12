import { createAppAsyncThunk } from "../createAppAsyncThunk";
import { Project } from "@/adapters/secondary/project/project";
import { projectsGateway } from "@/adapters/secondary/project/projectsGateway";
import { Token } from "../auth/auth";
import { dbProjectRetriever } from "@/adapters/secondary/project/dbProjectRetriever";
import { User } from "@/adapters/secondary/user/user";

export const deleteManyProjectsById = createAppAsyncThunk<
  Project[],
  { token: Token["access_token"]; projectsToDeleteIds: Project["id"][],userId:User["id"] }
>("deleteProjectsByIds", async ({ token, projectsToDeleteIds,userId }) => {
  const deleted_projects = await projectsGateway(
    dbProjectRetriever(),
  ).deleteProjectsByIds(token, projectsToDeleteIds,userId);
  return deleted_projects;
});
