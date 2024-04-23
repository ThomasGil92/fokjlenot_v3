import axios from "axios";
import { User } from "../user/user";
import { Token } from "@/core/use-cases/auth/auth";
import { Project, ProjectRetriever } from "./project";

export const mswProjectRetriever = (): ProjectRetriever => {
  return {
    getProjectsListByUserId: async (
      userId: User["id"],
      token: Token["access_token"] | null,
    ) => {
      try {
        const response = await axios.get("/api/projects", {
          params: { userId },
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data.projects_list;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          //   console.log(error.response?.data.error);
          throw new Error(error.response?.statusText);
        }
      }
    },
    getProjectById: async (
      userId: User["id"],
      token: Token["access_token"] | null,
      projectId: Project["id"],
    ) => {
      try {
        const response = await axios.get("/api/project", {
          params: { userId, projectId },
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data.selected_project;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          //   console.log(error.response?.data.error);
          throw new Error(error.response?.statusText);
        }
      }
    },
  };
};
