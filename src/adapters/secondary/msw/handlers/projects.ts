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

const token = (
  req: ResponseResolverInfo<
    HttpRequestResolverExtras<PathParams>,
    DefaultBodyType
  >,
) => {
  return req.request.headers.get("Authorization") === "Bearer access_token1234";
};
let projects: Project[] = [
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
  projectId?: Project["id"] | null,
) => {
  const filteredProjects = projectArray.filter(
    (project) => project.owner === "1",
  );
  if (projectId)
    return filteredProjects.find((project) => project.id === projectId);

  return filteredProjects;
};

export const projectsHandlers = [
  http.get(`/api/projects`, async (req) => {
    if (token(req)) {
      return HttpResponse.json({
        projects_list: filteredByUserId(projects),
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
    const projectId = url.searchParams.get("projectId");

    if (token(req)) {
      return HttpResponse.json({
        selected_project: filteredByUserId(projects, projectId),
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
  http.post(`/api/project`, async (req) => {
    const newProject = (await req.request.json()) as Project;

    projects = [...projects, newProject];

    if (token(req)) {
      return HttpResponse.json({
        projects_list: filteredByUserId(projects),
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
