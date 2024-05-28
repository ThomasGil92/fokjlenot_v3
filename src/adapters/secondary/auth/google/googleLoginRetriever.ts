import { Token } from "@/core/use-cases/auth/auth";
import axios from "axios";
import { User } from "../../user/user";

export const googleLoginRetriever = () => {
  return {
    loginWithGoogle: async (
      token: string,
    ): Promise<{ token: Token["access_token"]; user: User }> => {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/signin/google`,
        {token},
      );

      return { token: response.data.access_token, user: response.data.user };
    },
    signupWithGoogle: async (
      token: string,
    ): Promise<{ token: Token["access_token"]; user: User }> => {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/signup/google`,
        {token},
      );

      return { token: response.data.access_token, user: response.data.user };
    },
  };
};
