import { Project } from "@/adapters/secondary/project/project";

//Interface du state du store
export interface AppState {
  auth: {
    isAuth: boolean;
    access_token: string ;
    refresh_token:string;
    user?:{
      email:string,
      first_name:string,
      last_name:string,
      id:string,
      password?:string
    }
  };
  projects: {
    list: Project[];
    selected: Project | null;
    loading: boolean;error:string|undefined
  };
}

