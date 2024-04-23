import { authGateway } from "@/adapters/secondary/auth/authGateway";
import { createAppAsyncThunk } from "../createAppAsyncThunk";
import { Token, UserCredential } from "./auth";
import { mswLoginRetriever } from "@/adapters/secondary/auth/mswLoginRetriever";
import { User } from "@/adapters/secondary/user/user";

export const login = createAppAsyncThunk<
  { token: Token; user: User },
  UserCredential
>("userLogin", async (userCredentials) => {
  const token = await authGateway(mswLoginRetriever()).login(userCredentials);

  return token;
});
