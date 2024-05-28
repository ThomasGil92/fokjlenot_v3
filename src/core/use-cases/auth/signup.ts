import { authGateway } from "@/adapters/secondary/auth/authGateway";
import { createAppAsyncThunk } from "../createAppAsyncThunk";
import { Token, UserCredential } from "./auth";
import { User } from "@/adapters/secondary/user/user";
import { googleLoginRetriever } from "@/adapters/secondary/auth/google/googleLoginRetriever";
import { googleAuthGateway } from "@/adapters/secondary/auth/google/googleAuthGateway";
import { dbLoginRetriever } from "@/adapters/secondary/auth/dbLoginRetriever";


export const signup = createAppAsyncThunk<
  { token: Token | Token["access_token"]; user: User },
  UserCredential,
  { rejectValue: string }
>("userSignup", async (userCredentials, { rejectWithValue }) => {
  try {
    const response = await authGateway(dbLoginRetriever()).signup(
      userCredentials,
    );
    return response;
  } catch (error) {
    const err = error as Error;
    return rejectWithValue(err.message);
  }
});
export const signupWithGoogle = createAppAsyncThunk<
  { token: Token | Token["access_token"]; user: User },
  string
>("userSignupWithGoogle", async (token) => {
  const response = await googleAuthGateway(
    googleLoginRetriever(),
  ).signupWithGoogle(token);

  return response;
});
