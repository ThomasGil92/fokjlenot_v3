import { Token } from "@/core/use-cases/auth/auth";
import { ProjectId, Task, TaskStatus, tasksRetriever } from "./task";

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
    updateTaskStatus: async (token: Token["access_token"],taskId:Task["id"],newStatus:TaskStatus) => {
      const response = await tasksRetriever.updateTaskStatus(
        token,
        taskId,
        newStatus,
      );
      return response;
    },
   
  };
};