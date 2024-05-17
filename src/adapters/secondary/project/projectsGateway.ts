import { Token } from "@/core/use-cases/auth/auth";
import { Project, ProjectRetriever, UserId } from "./project";

export const projectsGateway = (projectRetriever: ProjectRetriever) => {
  /* const filteredProjectsById = (
    projectArray: Project[],
    userId: User["id"],
  ): Project[] => {
    const filteredProjects = projectArray.filter(
      (project) => project.owner === userId,
    );
    console.log("filtered", projectArray, userId);
    return filteredProjects;
  }; */

  return {
    getProjectsByUserId: async (
      token: Token["access_token"] | null,
      userId: UserId,
    ) => {
      const response = await projectRetriever.getProjectsListByUserId(
        token,
        userId,
      );
      return response;
    },
    getProjectById: async (
      token: Token["access_token"] | null,
      projectId: Project["id"],
    ) => {
      const response = await projectRetriever.getProjectById(token, projectId);
      return response;
    },
    postNewProject: async (
      token: Token["access_token"] | null,
      newProject: Project,
    ) => {
      const response = await projectRetriever.postNewProject(token, newProject);
      return response;
    },
  };
};
