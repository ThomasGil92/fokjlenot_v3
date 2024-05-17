import { authGateway } from "@/adapters/secondary/auth/authGateway";
import { createAppAsyncThunk } from "../createAppAsyncThunk";
import { Token, UserCredential } from "./auth";
import { dbLoginRetriever } from "@/adapters/secondary/auth/dbLoginRetriever";
import { User } from "@/adapters/secondary/user/user";

export const login = createAppAsyncThunk<
  { token: Token | Token["access_token"]; user: User },
  UserCredential
>("userLogin", async (userCredentials) => {
  const token = await authGateway(dbLoginRetriever()).login(userCredentials);

  return token;
});
