import { authGateway } from "@/adapters/secondary/auth/authGateway";
import { createAppAsyncThunk } from "../createAppAsyncThunk";
import { Token, UserCredential } from "./auth";
import { dbLoginRetriever } from "@/adapters/secondary/auth/dbLoginRetriever";
import { User } from "@/adapters/secondary/user/user";
import { googleLoginRetriever } from "@/adapters/secondary/auth/google/googleLoginRetriever";
import { googleAuthGateway } from "@/adapters/secondary/auth/google/googleAuthGateway";

export const login = createAppAsyncThunk<
  { token: Token | Token["access_token"]; user: User },
  UserCredential
>("userLogin", async (userCredentials) => {
  const response = await authGateway(dbLoginRetriever()).login(userCredentials);

  return response;
});
export const loginWithGoogle = createAppAsyncThunk<
  { token: Token | Token["access_token"]; user: User },
  string
>("userLoginWithGoogle", async (token) => {
  
  const response = await googleAuthGateway(googleLoginRetriever()).loginWithGoogle(
    token,
  );

  return response;
});
