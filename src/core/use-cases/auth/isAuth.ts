import { createAction } from "@reduxjs/toolkit";
import { checkAuthStatus } from "@/adapters/primary/react/authAdapter";



export const isAuth = createAction(
  "authRetrievalReducer",
  function prepare() {
    return {
      payload: checkAuthStatus()
    };
  },
);
