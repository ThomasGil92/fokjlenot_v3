import { HttpResponse, PathParams, http } from "msw";
import {
  Project,
  ProjectStatus,
} from "@/adapters/secondary/project/project.ts";
import {
  DefaultBodyType,
  ResponseResolverInfo,
} from "node_modules/msw/lib/core/handlers/RequestHandler";
import { HttpRequestResolverExtras } from "node_modules/msw/lib/core/handlers/HttpHandler";
import { User } from "../../user/user";

const token = (
  req: ResponseResolverInfo<
    HttpRequestResolverExtras<PathParams>,
    DefaultBodyType
  >,
) => {
  return req.request.headers.get("Authorization") === "Bearer Token.1234";
};
const projects: Project[] = [
  {
    id: "1",
    title: "First Project",
    status: ProjectStatus.PENDING,
    owner: "1",
    collaborators: [],
  },
  {
    id: "2",
    title: "Second Project",
    status: ProjectStatus.DONE,
    owner: "1",
    collaborators: [],
  },
  {
    id: "3",
    title: "third Project",
    status: ProjectStatus.DONE,
    owner: "2",
    collaborators: [],
  },
];

const filteredByUserId = (
  projectArray: Project[],
  userId: User["id"],
  projectId?: Project["id"]|null,
) => {
  const filteredProjects = projectArray.filter(
    (project) => project.owner === userId,
  );
  if (projectId) return filteredProjects.filter((project) => project.id === projectId);
  return filteredProjects;
};

export const projectsHandlers = [
  http.get(`/api/projects`, async (req) => {
    const url = new URL(req.request.url);

    // Read the "id" URL query parameter using the "URLSearchParams" API.
    // Given "/product?id=1", "productId" will equal "1".
    const userId = url.searchParams.get("userId");

    if (userId && token(req)) {
      return HttpResponse.json({
        projects_list: filteredByUserId(projects, userId),
      });
    } else {
      //console.log(error)
      return HttpResponse.json(
        {
          error: "Pas de token présent",
        },
        { status: 401 },
      );
    }
  }),
  http.get(`/api/project`, async (req) => {
    const url = new URL(req.request.url);

    // Read the "id" URL query parameter using the "URLSearchParams" API.
    // Given "/product?id=1", "productId" will equal "1".
    const userId = url.searchParams.get("userId");
    const projectId = url.searchParams.get("projectId");

    if (userId && token(req)) {
      return HttpResponse.json({
        selected_project: filteredByUserId(projects, userId, projectId),
      });
    } else {
      //console.log(error)
      return HttpResponse.json(
        {
          error: "Pas de token présent",
        },
        { status: 401 },
      );
    }
  }),
];
