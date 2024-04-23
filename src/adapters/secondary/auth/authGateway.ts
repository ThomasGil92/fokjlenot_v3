import { UserCredential } from "@/core/use-cases/auth/auth";
import { AuthRetriever } from "./authRetriever";

export const authGateway = (authRetriever: AuthRetriever) => {
  return {
    login: async (userCredentials: UserCredential) => {
      const response = await authRetriever.login(userCredentials);
      return response;
    },
  };
};
