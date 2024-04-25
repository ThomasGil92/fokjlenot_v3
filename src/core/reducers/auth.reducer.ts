import { AppState } from "@/infra/store/appState";
import { createReducer } from "@reduxjs/toolkit";
import { isAuth } from "../use-cases/auth/isAuth";
import { login } from "../use-cases/auth/login";
import { logout } from "../use-cases/auth/logout";

const initialState: AppState["auth"] = {
  isAuth: false,
  access_token: null,
  refresh_token: null,
  loading: true,
};

export const authRetrievalReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(isAuth, (_, action) => {
      return {
        ...initialState,
        isAuth: action.payload.isAuth,
        access_token: action.payload.token,
        loading: false,
      };
    })
    .addCase(login.fulfilled, (state, action) => {
      localStorage.setItem("authToken", action.payload.token.access_token);
      state.access_token = action.payload.token.access_token;
      state.refresh_token = action.payload.token.refresh_token;
      state.isAuth = true;
    })
    .addCase(logout, (state) => {
      localStorage.removeItem("authToken");
      state.isAuth = false;
      state.access_token = null;
      state.refresh_token = null;
    });
});
