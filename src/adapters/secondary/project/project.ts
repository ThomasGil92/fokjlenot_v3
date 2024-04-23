
import { Token } from "@/core/use-cases/auth/auth";
import { User } from "../user/user";


export enum ProjectStatus {
  PENDING = "pending",
  DONE = "done",
  PROGRESS = "progress",
}

export type UserId = User["id"];

export type Project = {
  id: string;
  title: string;
  status: ProjectStatus;
  owner: UserId;
  collaborators: User["id"][]
};

export interface ProjectRetriever{
  getProjectsListByUserId:(userId:User["id"],token:Token["access_token"]|null)=>Promise<Project[]>,
  getProjectById:(userId:User["id"],token:Token["access_token"]|null,projectId:Project["id"])=>Promise<Project>
}
