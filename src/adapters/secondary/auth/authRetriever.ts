import { Token, UserCredential } from "@/core/use-cases/auth/auth";
import { User } from "../user/user";

export interface AuthRetriever {
  login(
    userCredential: UserCredential,
  ): Promise<{ token: Token | Token["access_token"]; user: User }>;
   getUserByToken(
    token: Token["access_token"],
  ): Promise<{ email: string; id: string }>;
}
