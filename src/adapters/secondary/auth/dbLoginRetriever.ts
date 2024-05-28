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
    signup: async (
      userCredentials: UserCredential,
    ): Promise<{ token: Token["access_token"]; user: User }> => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/user`,
          { ...userCredentials, pseudo: "pseudo" },
        );

        return { token: response.data.access_token, user: response.data.user };
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          // Vérifier si l'erreur est liée à un utilisateur déjà existant
          if (error.response.status === 409) {
            // Par exemple, le statut HTTP 409 pour "Conflict"
            throw new Error("Cet utilisateur existe déjà.");
          }
        }
        // Propager d'autres erreurs non spécifiques
        throw new Error("Une erreur est survenue lors de l'inscription.");
      }
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
