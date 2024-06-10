import { AppState } from "@/infra/store/appState";
import { createReducer } from "@reduxjs/toolkit";
import { getProjectsListByUserId } from "../use-cases/projects/getProjectListByUserId";
import { getProjectById } from "../use-cases/projects/getProjectById";
import { postNewProject } from "../use-cases/projects/postNewProject";

const initialState: AppState["projects"] = {
  list: [],
  selected: null,
};

export const projectsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getProjectsListByUserId.fulfilled, (state, action) => {
      return { ...state, list: action.payload };
    })
    .addCase(getProjectsListByUserId.rejected, (_, action) => {
      return { ...initialState, error: action.error.message };
    })
    .addCase(getProjectById.fulfilled, (state, action) => {
      return { ...state, selected: action.payload.project };
    })
    .addCase(getProjectById.rejected, (_, action) => {
      return { ...initialState, error: action.error.message };
    })
    .addCase(postNewProject.rejected, (_, action) => {
      return { ...initialState, error: action.error.message };
    })
    .addCase(postNewProject.fulfilled, (state, action) => {
      return { ...initialState, list: [...state.list,action.payload] };
    });
});
