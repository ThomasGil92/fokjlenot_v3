import { AppState } from "@/infra/store/appState";
import { createReducer } from "@reduxjs/toolkit";
import { isAuth } from "../use-cases/auth/isAuth";
import { login } from "../use-cases/auth/login";
import { logout } from "../use-cases/auth/logout";

const initialState: AppState["auth"] = {
  isAuth: false,
  access_token: null,
  loading: true,
  user: null,
};

export const authRetrievalReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(isAuth.fulfilled, (_, action) => {
      return {
        ...initialState,
        isAuth: action.payload.isAuth,
        user: {
          email: action.payload.email,
          id: action.payload.id,
          first_name: "",
          last_name: "",
        },
        access_token:action.payload.token,
        loading: false,
      };
    })
    .addCase(login.fulfilled, (state, action) => {
      localStorage.setItem("authToken", action.payload.token as string);
      state.access_token = action.payload.token as string;
      state.isAuth = true;
      state.user = action.payload.user;
    })
    .addCase(logout, (state) => {
      localStorage.removeItem("authToken");
      state.isAuth = false;
      state.access_token = null;
    });
});
