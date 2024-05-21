import { AppState } from "@/infra/store/appState";
import { createReducer } from "@reduxjs/toolkit";
import { getProjectById } from "../use-cases/projects/getProjectById";
import { postNewTask } from "../use-cases/tasks/postNewTask";
import { updateTaskStatus } from "../use-cases/tasks/updateTaskStatus";
import { TaskStatus } from "@/adapters/secondary/task/task";

const initialState: AppState["tasks"] = {
  list: [],

  loading: false,
  error: undefined,
};

export const tasksReducer = createReducer(initialState, (builder) => {
  builder

    .addCase(getProjectById.fulfilled, (_, action) => {
      const tasks = action.payload.tasks.map((task) => {
        return {
          ...task,
          status: task.status.toLocaleLowerCase() as TaskStatus,
        };
      });
      return { ...initialState, list: tasks };
    })
    .addCase(getProjectById.rejected, (_, action) => {
      return { ...initialState, error: action.error.message };
    })
    .addCase(postNewTask.fulfilled, (_, action) => {
      return { ...initialState, list: action.payload };
    })
    .addCase(updateTaskStatus.fulfilled, (_, action) => {
      return { ...initialState, list: action.payload };
    });
});
