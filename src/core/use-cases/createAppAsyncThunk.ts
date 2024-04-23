import { AppState } from "@/infra/store/appState";
import { AppDispatch, Gateways } from "@/infra/store/reduxStore";
import {  createAsyncThunk } from "@reduxjs/toolkit";



//custom hook pour typer la fonction createAsycThunk
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppState;
  dispatch: AppDispatch;
  rejectValue: string;
  extra: Gateways;
}>();


