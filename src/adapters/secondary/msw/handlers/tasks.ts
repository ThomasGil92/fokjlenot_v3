import { HttpResponse, PathParams, http } from "msw";
import { Project } from "@/adapters/secondary/project/project.ts";
import {
  DefaultBodyType,
  ResponseResolverInfo,
} from "node_modules/msw/lib/core/handlers/RequestHandler";
import { HttpRequestResolverExtras } from "node_modules/msw/lib/core/handlers/HttpHandler";
import { Task, TaskPriority, TaskStatus } from "../../task/task";

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
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet augue tincidunt, maximus ipsum eget, volutpat dui. Pellentesque posuere diam eget arcu aliquet venenatis.",
    projectId: "1",
    collaborators: [],
    priority: TaskPriority.MEDIUM,
  },
  {
    id: "2",
    title: "Second Task",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet augue tincidunt, maximus ipsum eget, volutpat dui. Pellentesque posuere diam eget arcu aliquet venenatis.",
    status: TaskStatus.DONE,
    projectId: "1",
    priority: TaskPriority.LOW,
    collaborators: [],
  },
  {
    id: "3",
    title: "third Task",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet augue tincidunt, maximus ipsum eget, volutpat dui. Pellentesque posuere diam eget arcu aliquet venenatis.",
    status: TaskStatus.DONE,
    projectId: "2",
    collaborators: [],
  },
  {
    id: "4",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet augue tincidunt, maximus ipsum eget, volutpat dui. Pellentesque posuere diam eget arcu aliquet venenatis.",
    title: "Fourth Task",
    status: TaskStatus.PROGRESS,
    projectId: "2",
    collaborators: [],
  },
  {
    id: "5",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet augue tincidunt, maximus ipsum eget, volutpat dui. Pellentesque posuere diam eget arcu aliquet venenatis.",
    title: "Fifth Task",
    status: TaskStatus.PROGRESS,
    projectId: "1",
    priority: TaskPriority.HIGHT,
    collaborators: [],
  },
];

const filteredByProjectId = (
  taskArray: Task[],
  projectId?: Project["id"] | null,
) => {
  const filteredProjects = taskArray.filter(
    (task) => task.projectId === projectId,
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
  // Add a new task
  http.post(`/api/newTask`, async (req) => {
    const newTask = (await req.request.json()) as Task;
    newTask.id = (tasks.length + 1).toString();
    tasks = [...tasks, newTask];
    if (token(req)) {
      return HttpResponse.json({
        new_task_list: filteredByProjectId(tasks, newTask.projectId),
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
  http.patch(`/api/updateStatus`, async (req) => {
    const { taskId, newStatus } = (await req.request.json()) as {
      taskId: Task["id"];
      newStatus: TaskStatus;
    };
    const taskToUpdateIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskToUpdateIndex !== -1) tasks[taskToUpdateIndex].status = newStatus;
    console.log();
    if (token(req)) {
      return HttpResponse.json({
        updated_task_list: filteredByProjectId(
          tasks,
          tasks[taskToUpdateIndex].projectId,
        ),
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
  http.put(`/api/updateTask`, async (req) => {
    const  {updatedTask}  = (await req.request.json()) as {updatedTask:Task}
    const taskToUpdateIndex = tasks.findIndex((task) => task.id === updatedTask.id);
    if (taskToUpdateIndex !== -1) tasks[taskToUpdateIndex] = updatedTask;
    if (token(req)) {
      return HttpResponse.json({
        updated_task_list: filteredByProjectId(
          tasks,
          tasks[taskToUpdateIndex].projectId,
        ),
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
