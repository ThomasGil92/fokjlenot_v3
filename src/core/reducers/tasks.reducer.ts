import { AppState } from "@/infra/store/appState";
import { createReducer } from "@reduxjs/toolkit";
import { getProjectById } from "../use-cases/projects/getProjectById";
import { postNewTask } from "../use-cases/tasks/postNewTask";
import { updateTask } from "../use-cases/tasks/updateTask";

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
        };
      });
      return { ...initialState, list: tasks };
    })
    .addCase(getProjectById.rejected, (_, action) => {
      return { ...initialState, error: action.error.message };
    })
    .addCase(postNewTask.fulfilled, (state, action) => {
      return { ...initialState, list: [...state.list, action.payload] };
    })
    .addCase(updateTask.fulfilled, (state, action) => {
      const id = action.payload.id!;
      const updatedTask = action.payload;
      return {
        ...initialState,
        list: state.list.map((task) => (task.id === id ? updatedTask : task)),
      };
    });
});
