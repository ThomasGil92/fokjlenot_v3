import { createAppAsyncThunk } from "../createAppAsyncThunk";
import { Project } from "@/adapters/secondary/project/project";
import { User } from "@/adapters/secondary/user/user";
import { projectsGateway } from "@/adapters/secondary/project/projectsGateway";
import { mswProjectRetriever } from "@/adapters/secondary/project/mswProjectsRetriever";
import { Token } from "../auth/auth";

export const getProjectsListByUserId = createAppAsyncThunk<
  Project[],
  { userId: User["id"], token: Token["access_token"]  }
>("getProjectListByUserId", async ({ userId, token }) => {
  const projects_list = await projectsGateway(
    mswProjectRetriever(),
  ).getProjectsByUserId(userId, token);
  return projects_list;
});
