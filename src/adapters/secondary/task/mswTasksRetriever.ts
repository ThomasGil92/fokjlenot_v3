import axios from "axios";
import { Token } from "@/core/use-cases/auth/auth";
import { ProjectId, tasksRetriever } from "./task";

export const mswTasksRetriever = (): tasksRetriever => {
  return {
    
    getTasksByProjectId: async (
      token: Token["access_token"],
      projectId: ProjectId,
    ) => {
      try {
        const response = await axios.get("/api/tasks", {
          params: { projectId },
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data.task_list;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          //   console.log(error.response?.data.error);
          throw new Error(error.response?.statusText);
        }
      }
    },
    
  };
};
