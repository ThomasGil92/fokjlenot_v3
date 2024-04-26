import { Token } from "@/core/use-cases/auth/auth";
import { ProjectId, Task, tasksRetriever } from "./task";

export const tasksGateway = (tasksRetriever: tasksRetriever) => {
 
  return {
    getTasksByProjectId: async (token: Token["access_token"],projectId:ProjectId) => {
      const response = await tasksRetriever.getTasksByProjectId(token,projectId)
      return response;
    },
    postNewTask: async (token: Token["access_token"],newTask:Task) => {
      const response = await tasksRetriever.postNewTask(token,newTask)
      console.log(response)
      return response;
    },
   
  };
};
