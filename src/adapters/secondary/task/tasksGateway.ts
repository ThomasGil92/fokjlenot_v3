import { Token } from "@/core/use-cases/auth/auth";
import { ProjectId, tasksRetriever } from "./task";

export const tasksGateway = (tasksRetriever: tasksRetriever) => {
 
  return {
    getTasksByProjectId: async (token: Token["access_token"],projectId:ProjectId) => {
      const response = await tasksRetriever.getTasksByProjectId(token,projectId)
      return response;
    },
   
  };
};
