import { GoogleAuthRetriever } from "./googleAuthRetriever";

export const googleAuthGateway = (googleAuthRetriever: GoogleAuthRetriever) => {
  return {
    loginWithGoogle: async (token: string) => {
      const response = await googleAuthRetriever.loginWithGoogle(token);
      return response;
    },
    signupWithGoogle: async (token: string) => {
      const response = await googleAuthRetriever.signupWithGoogle(token);
      return response;
    },
  };
};
