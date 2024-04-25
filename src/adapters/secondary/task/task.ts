import { Token } from "@/core/use-cases/auth/auth";
import { User } from "../user/user";
import { Project } from "../project/project";

export enum TaskStatus {
  PENDING = "pending",
  DONE = "done",
  PROGRESS = "progress",
}

export type ProjectId = Project["id"];

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  projectId: ProjectId;
  collaborators: User["id"][];
};

export interface tasksRetriever{
    getTasksByProjectId:(token:Token["access_token"],projectId:ProjectId)=> Promise<Task[]>
}


