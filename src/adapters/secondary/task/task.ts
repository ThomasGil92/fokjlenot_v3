import { Token } from "@/core/use-cases/auth/auth";
import { User } from "../user/user";
import { Project } from "../project/project";

export enum TaskStatus {
  PENDING = "PENDING",
  PROGRESS = "PROGRESS",
  DONE = "DONE",
}

export enum TaskPriority {
  HIGHT = "HIGHT",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
}

export type ProjectId = Project["id"];

export type Task = {
  id?: string;
  description: string;
  title: string;
  status: TaskStatus;
  projectId: ProjectId;
  collaborators?: User["id"][];
  priority?: TaskPriority;
};

export interface tasksRetriever {
  getTasksByProjectId: (
    token: Token["access_token"],
    projectId: ProjectId,
  ) => Promise<Task[]>;
  postNewTask: (
    token: Token["access_token"],
    newTask: Partial<Task>,
  ) => Promise<Task>;
  updateTaskStatus: (
    token: Token["access_token"],
    taskId: Task["id"],
    newStatus: TaskStatus,
  ) => Promise<Task[]>;
  updateTask: (
    token: Token["access_token"],
    updatedTask: Task,
  ) => Promise<Task>;
}
