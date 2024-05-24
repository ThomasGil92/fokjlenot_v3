import { Token } from "@/core/use-cases/auth/auth";
import { User } from "../../user/user";

export interface GoogleAuthRetriever {
  loginWithGoogle(
    token: string,
  ): Promise<{ token: Token | Token["access_token"]; user: User }>;
}
