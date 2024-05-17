import { Project } from "@/adapters/secondary/project/project";
import { Task } from "@/adapters/secondary/task/task";
import { User } from "@/adapters/secondary/user/user";

//Interface du state du store
export interface AppState {
  auth: {
    isAuth: boolean;
    access_token: string | null;
    loading: boolean;
    user: User|null;
  };
  projects: {
    list: Project[];
    selected: Project | null;
    loading: boolean;
    error: string | undefined;
  };
  tasks: { list: Task[]; loading: boolean; error: string | undefined };
}
