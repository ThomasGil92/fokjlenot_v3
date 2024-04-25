import { authHandlers } from "./handlers/auth";
import { projectsHandlers } from "./handlers/projects";
import { tasksHandlers } from "./handlers/tasks";

export const handlers = [
 ...authHandlers,...projectsHandlers,...tasksHandlers
];
