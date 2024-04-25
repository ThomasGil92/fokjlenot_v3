import { AppState } from "@/infra/store/appState";
import { createReducer } from "@reduxjs/toolkit";
import { getProjectById } from "../use-cases/projects/getProjectById";

const initialState: AppState["tasks"] = {
  list: [],

  loading: false,
  error: undefined,
};

export const tasksReducer = createReducer(initialState, (builder) => {
  builder
    
    .addCase(getProjectById.fulfilled, (_, action) => {
      return { ...initialState, list: action.payload.tasks };
    })
    .addCase(getProjectById.rejected, (_, action) => {
      return { ...initialState, error: action.error.message };
    })
    
});
