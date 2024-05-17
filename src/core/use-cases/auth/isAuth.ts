import { createAppAsyncThunk } from "../createAppAsyncThunk";
import { authGateway } from "@/adapters/secondary/auth/authGateway";
import { dbLoginRetriever } from "@/adapters/secondary/auth/dbLoginRetriever";
import { Token } from "./auth";

export const isAuth = createAppAsyncThunk<{
  email: string;
  id: string;
  isAuth: boolean;
  token: Token["access_token"];
}>("isAuth", async () => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Token is missing");

  const response = await authGateway(dbLoginRetriever()).getUserByToken(token);

  return { ...response, isAuth: true, token };
});
