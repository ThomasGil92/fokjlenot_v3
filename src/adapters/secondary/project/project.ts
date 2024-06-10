import { Token } from "@/core/use-cases/auth/auth";
import { User } from "../user/user";
import { Task } from "../task/task";

export enum ProjectStatus {
  PENDING = "pending",
  DONE = "done",
  PROGRESS = "progress",
}

export type UserId = User["id"];

export type Project = {
  id?: string;
  title: string;
  status: ProjectStatus;
  ownerId: UserId;collaborators?:User[]
  description?:string
  tasks?:Task[]
};

export interface ProjectRetriever {
  getProjectsListByUserId: (
    token: Token["access_token"] | null,
    userId: UserId,
  ) => Promise<Project[]>;
  getProjectById: (
    token: Token["access_token"] | null,
    projectId: Project["id"],
  ) => Promise<Project>;
  postNewProject: (
    token: Token["access_token"] | null,
    newProject: Project,
  ) => Promise<Project>;
}
