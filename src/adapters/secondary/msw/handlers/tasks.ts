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
import { Task, TaskStatus } from "../../task/task";

const token = (
  req: ResponseResolverInfo<
    HttpRequestResolverExtras<PathParams>,
    DefaultBodyType
  >,
) => {
  return req.request.headers.get("Authorization") === "Bearer access_token1234";
};
let tasks: Task[] = [
  {
    id: "1",
    title: "First Task",
    status: TaskStatus.PENDING,
    projectId: "1",
    collaborators: [],
  },
  {
    id: "2",
    title: "Second Task",
    status: TaskStatus.DONE,
    projectId: "1",
    collaborators: [],
  },
  {
    id: "3",
    title: "third Task",
    status: TaskStatus.DONE,
    projectId: "2",
    collaborators: [],
  },
  {
    id: "4",
    title: "Fourth Task",
    status: TaskStatus.PROGRESS,
    projectId: "2",
    collaborators: [],
  },
  {
    id: "5",
    title: "Fifth Task",
    status: TaskStatus.PROGRESS,
    projectId: "1",
    collaborators: [],
  },
];

const filteredByProjectId = (
  taskArray: Task[],
  projectId?: Project["id"] | null,
) => {
  const filteredProjects = taskArray.filter(
    (task) => task.projectId===projectId,
  );
  
  return filteredProjects;
};

export const tasksHandlers = [
  
  http.get(`/api/tasks`, async (req) => {
    const url = new URL(req.request.url);

    // Read the "id" URL query parameter using the "URLSearchParams" API.
    // Given "/product?id=1", "productId" will equal "1".
    const projectId = url.searchParams.get("projectId");

    if (token(req)) {
      return HttpResponse.json({
        task_list: filteredByProjectId(tasks, projectId),
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
