import axios from "axios";
import { Token } from "@/core/use-cases/auth/auth";
import { ProjectId, Task, tasksRetriever } from "./task";

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
        console.log("prout")
        const response = await axios.post("/api/newTask", 
           newTask ,
          {headers: { Authorization: `Bearer ${token}` }},
        );
        console.log("msw res",response.data);
        return response.data.new_task_list;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          //   console.log(error.response?.data.error);
          throw new Error(error.response?.statusText);
        }
      }
    },
  }
    
    
  
};
