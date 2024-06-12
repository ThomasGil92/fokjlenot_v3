import { createAppAsyncThunk } from "../createAppAsyncThunk";
import { Project } from "@/adapters/secondary/project/project";
import { projectsGateway } from "@/adapters/secondary/project/projectsGateway";
import { Token } from "../auth/auth";
import { dbProjectRetriever } from "@/adapters/secondary/project/dbProjectRetriever";

export const deleteManyProjectsById = createAppAsyncThunk<
  unknown,
  { token: Token["access_token"]; projectsToDeleteIds: Project["id"][] }
>("deleteProjectsByIds", async ({ token, projectsToDeleteIds }) => {
  const deleted_projects = await projectsGateway(
    dbProjectRetriever(),
  ).deleteProjectsByIds(token, projectsToDeleteIds);
  return deleted_projects;
});
