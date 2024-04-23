import { createAppAsyncThunk } from "../createAppAsyncThunk";
import { Project } from "@/adapters/secondary/project/project";
import { User } from "@/adapters/secondary/user/user";
import { projectsGateway } from "@/adapters/secondary/project/projectsGateway";
import { mswProjectRetriever } from "@/adapters/secondary/project/mswProjectsRetriever";
import { Token } from "../auth/auth";

export const getProjectById = createAppAsyncThunk<
  Project,
  { userId: User["id"]; token: Token["access_token"] | null,projectId:Project["id"] }
>("getProjectById", async ({ userId, token,projectId }) => {
  const project = await projectsGateway(
    mswProjectRetriever(),
  ).getProjectById(userId, token,projectId);
  return project;
});
