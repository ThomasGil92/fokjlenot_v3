import { Token, UserCredential } from "@/core/use-cases/auth/auth";
import axios from "axios";
import { User } from "../user/user";

export const mswLoginRetriever = () => {
  return {
    login: async (userCredentials: UserCredential): Promise<{token:Token,user:User}> => {
      const response = await axios.post("/api/auth/login", userCredentials);

      return response.data;
    },
  };
};
