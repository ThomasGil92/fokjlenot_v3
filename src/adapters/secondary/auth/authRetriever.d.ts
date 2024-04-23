import { Token, UserCredential } from "@/core/use-cases/auth/auth";
import { User } from "../user/user";

export interface AuthRetriever{
    login(userCredential:UserCredential):Promise<{token:Token,user:User}>
}