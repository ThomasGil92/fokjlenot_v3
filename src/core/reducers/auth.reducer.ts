import { AppState } from "@/infra/store/appState";
import { createReducer } from "@reduxjs/toolkit";
import { isAuth } from "../use-cases/auth/isAuth";
import { login } from "../use-cases/auth/login";

const initialState: AppState["auth"] = { isAuth: false, access_token: null,refresh_token:null };

export const authRetrievalReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(isAuth, (_, action) => {
      return {
        ...initialState,
        isAuth: action.payload.isAuth,
        access_token: action.payload.token,
      };
    })
    .addCase(login.fulfilled, (state, action) => {
      state.access_token = action.payload.token.access_token;
      state.refresh_token = action.payload.token.refresh_token;
      state.user = action.payload.user
    });
});
