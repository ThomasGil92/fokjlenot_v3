import { ReduxStore, initReduxStore } from "@/infra/store/reduxStore";

import { worker } from "@/adapters/secondary/msw/server";
import { isAuth } from "../auth/isAuth";
import { getProjectById } from "../projects/getProjectById";
import { Token } from "../auth/auth";
import { postNewTask } from "./postNewTask";
import { Task, TaskPriority, TaskStatus } from "@/adapters/secondary/task/task";
import { updateTaskStatus } from "./updateTaskStatus";
import { updateTask } from "./updateTask";

describe("tasks gestion", () => {
  let store: ReduxStore;
  let token: Token["access_token"];
  beforeAll(() => {
    worker.listen();
    localStorage.setItem("authToken", "access_token1234");
  });
  beforeEach(() => {
    store = initReduxStore();
    store.dispatch(isAuth());
    token = store.getState().auth.access_token!;
  });

  test("should get all tasks with a project id", async () => {
    await store.dispatch(
      getProjectById({
        token,
        projectId: "2",
      }),
    );
    expect(store.getState().projects.selected).toBeDefined();
    expect(store.getState().tasks.list).not.toBeUndefined();
  });
  test("should be able to add a task", async () => {
    const newTask = {
      id: "6",
      title: "Sixth task",
      status: TaskStatus.PROGRESS,
      projectId: "1",
      collaborators: [],
    };

    await store.dispatch(postNewTask({ token, newTask }));
    expect(
      store.getState().tasks.list.filter((task) => task.id === "6"),
    ).toHaveLength(1);
  });
  test("should change status of a task", async () => {
    const taskId: Task["id"] = "6";
    const newStatus: TaskStatus = TaskStatus.DONE;
    await store.dispatch(updateTaskStatus({ token, taskId, newStatus }));
    expect(
      store
        .getState()
        .tasks.list.find(
          (task) => task.id === taskId && task.status === newStatus,
        ),
    ).toBeDefined();
  });
  test("should update any field of a task", async () => {
    const newTask: Task = {
      id: "7",
      title: "Seventh task",
      description:"Bla bla",
      status: TaskStatus.PROGRESS,
      projectId: "1",
      collaborators: [],
      priority: undefined,
    };

    await store.dispatch(postNewTask({ token, newTask }));

    const expectedTask=()=>{
      return store.getState().tasks.list.filter((task) => task.id === "7");
    }

    expect(
      expectedTask(),
    ).toHaveLength(1);
    const updatedTask = {
      ...newTask,
      status: TaskStatus.PENDING,
      priority: TaskPriority.HIGHT,
    };
    await store.dispatch(updateTask({ token, updatedTask }));
    expect(expectedTask()[0].status).toEqual(TaskStatus.PENDING);
    expect(expectedTask()[0].priority).toEqual(TaskPriority.HIGHT);
  });
});
