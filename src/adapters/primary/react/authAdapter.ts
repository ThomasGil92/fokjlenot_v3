import { Token } from "@/core/use-cases/auth/auth";

export const checkAuthStatus = ():{isAuth:boolean,token:Token["access_token"]|null} => {
  const token = localStorage.getItem("authToken");

  return {isAuth:!!token,token}; // Retourne true si un token est présent, sinon false
};
