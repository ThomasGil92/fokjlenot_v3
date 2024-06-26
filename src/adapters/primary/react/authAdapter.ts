import { Token } from "@/core/use-cases/auth/auth";

export const checkAuthStatus = ():
  | { isAuth: boolean; token: Token["access_token"] | null }
  | undefined => {
  const token = localStorage.getItem("authToken");
  if (token) return { isAuth: !!token, token }; // Retourne true si un token est présent, sinon false
};
