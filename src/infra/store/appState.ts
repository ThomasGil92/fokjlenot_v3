import { Project } from "@/adapters/secondary/project/project";
import { Task } from "@/adapters/secondary/task/task";
import { User } from "@/adapters/secondary/user/user";

//Interface du state du store
export interface AppState {
  global: {
    loading: boolean;
    loading_message?: string;
    error?: string;
  };
  auth: {
    isAuth: boolean;
    access_token: string | null;
    loading: boolean;
    user: User | null;
  };
  projects: {
    list: Project[];
    selected: Project | null;
  };
  tasks: { list: Task[] };
}
