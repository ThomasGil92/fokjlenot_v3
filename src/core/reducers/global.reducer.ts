import { AppState } from "@/infra/store/appState";
import { createReducer } from "@reduxjs/toolkit";
import { getProjectsListByUserId } from "../use-cases/projects/getProjectListByUserId";
import { getProjectById } from "../use-cases/projects/getProjectById";
import { postNewProject } from "../use-cases/projects/postNewProject";
import { updateTask } from "../use-cases/tasks/updateTask";

const initialState: AppState["global"] = {
  loading: false,
  error: undefined,
  loading_message: undefined,
};

export const globalReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getProjectsListByUserId.pending, () => {
      return { ...initialState, loading: true,loading_message:"Chargement" };
    })
    .addCase(getProjectsListByUserId.fulfilled, () => {
      return { ...initialState, loading: false };
    })
    .addCase(getProjectsListByUserId.rejected, (_, action) => {
      return { ...initialState, loading: false, error: action.error.message };
    })
    .addCase(getProjectById.pending, () => {
      return { ...initialState, loading: true, loading_message: "Chargement" };
    })
    .addCase(getProjectById.fulfilled, () => {
      return { ...initialState, loading: false };
    })
    .addCase(getProjectById.rejected, (_, action) => {
      return { ...initialState, loading: false, error: action.error.message };
    })
    .addCase(postNewProject.pending, () => {
      return { ...initialState, loading: true, loading_message: "Sauvegarde" };
    })
    .addCase(postNewProject.rejected, (_, action) => {
      return { ...initialState, loading: false, error: action.error.message };
    })
    .addCase(postNewProject.fulfilled, () => {
      return { ...initialState, loading: false };
    })
    .addCase(updateTask.pending, () => {
      return { ...initialState, loading: true, loading_message: "Sauvegarde" };
    })
    .addCase(updateTask.fulfilled, () => {
      return { ...initialState, loading: false };
    })
    .addCase(updateTask.rejected, (_, action) => {
      return { ...initialState, loading: false, error: action.error.message };
    });
});
