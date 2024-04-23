import { Token } from "@/core/use-cases/auth/auth";
import { User } from "../user/user";
import { Project, ProjectRetriever } from "./project";

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
      userId: User["id"],
      token: Token["access_token"] | null,
    ) => {
      const response = await projectRetriever.getProjectsListByUserId(
        userId,
        token,
      );
      return response;
    },
    getProjectById: async (
      userId: User["id"],
      token: Token["access_token"] | null,
      projectId: Project["id"],
    ) => {
      const response = await projectRetriever.getProjectById(
        userId,
        token,
        projectId,
      );
      return response;
    },
  };
};
