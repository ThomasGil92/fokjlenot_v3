import { Token, UserCredential } from "@/core/use-cases/auth/auth";
import axios from "axios";
import { User } from "../user/user";

export const dbLoginRetriever = () => {
  return {
    login: async (
      userCredentials: UserCredential,
    ): Promise<{ token: Token["access_token"]; user: User }> => {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        userCredentials,
      );

      return { token: response.data.access_token, user: response.data.user };
    },
    getUserByToken: async (
      token: Token["access_token"],
    ): Promise<{ email: string; id: string }> => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/user/token`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return response.data;
    },
  };
};
