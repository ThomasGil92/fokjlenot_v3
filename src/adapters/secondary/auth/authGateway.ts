import { Token, UserCredential } from "@/core/use-cases/auth/auth";
import { AuthRetriever } from "./authRetriever";

export const authGateway = (authRetriever: AuthRetriever) => {
  return {
    login: async (userCredentials: UserCredential) => {
      const response = await authRetriever.login(userCredentials);
      return response;
    },

    getUserByToken: async (token: Token["access_token"]) => {
      const response = await authRetriever.getUserByToken(token);
      return response;
    },
    signup:async(userCredentials:UserCredential)=>{
      const response=await authRetriever.signup(userCredentials)
      return response
    }
  };
};
