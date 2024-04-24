import { Project } from "@/adapters/secondary/project/project";

//Interface du state du store
export interface AppState {
  auth: {
    isAuth: boolean;
    access_token: string | null;
    refresh_token: string | null;
    loading: boolean;
  };
  projects: {
    list: Project[];
    selected: Project | null;
    loading: boolean;
    error: string | undefined;
  };
}
