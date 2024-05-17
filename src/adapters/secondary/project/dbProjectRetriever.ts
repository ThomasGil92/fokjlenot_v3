import axios from "axios";
import { Token } from "@/core/use-cases/auth/auth";
import { Project, ProjectRetriever, UserId } from "./project";

export const dbProjectRetriever = (): ProjectRetriever => {
  return {
    getProjectsListByUserId: async (token: Token["access_token"] | null,userId:UserId) => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/project/all/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        console.log(response.data)
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          //   console.log(error.response?.data.error);
          throw new Error(error.response?.statusText);
        }
      }
    },
    getProjectById: async (
      token: Token["access_token"] | null,
      projectId: Project["id"],
    ) => {
      try {
        const response = await axios.get("/api/project", {
          params: { projectId },
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
    postNewProject: async (
      token: Token["access_token"] | null,
      newProject: Project,
    ) => {
      try {
        const response = await axios.post("/api/project", newProject, {
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
  };
};
