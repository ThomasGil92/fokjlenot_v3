import axios from "axios";
import { Token } from "@/core/use-cases/auth/auth";
import { ProjectId, Task, TaskStatus, tasksRetriever } from "./task";

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
    postNewTask: async (
      token: Token["access_token"],
      newTask: Task,
    ) => {
      try {
        const response = await axios.post("/api/newTask", 
           newTask ,
          {headers: { Authorization: `Bearer ${token}` }},
        );
        return response.data.new_task_list;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          //   console.log(error.response?.data.error);
          throw new Error(error.response?.statusText);
        }
      }
    },
    updateTaskStatus: async (
      token: Token["access_token"],
     taskId:Task["id"],newStatus:TaskStatus
    ) => {
      try {
        const response = await axios.patch("/api/updateStatus", 
           {taskId,newStatus} ,
          {headers: { Authorization: `Bearer ${token}` }},
        );
        return response.data.updated_task_list;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          //   console.log(error.response?.data.error);
          throw new Error(error.response?.statusText);
        }
      }
    },
  }
    
    
  
};
