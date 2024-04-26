import { ReduxStore, initReduxStore } from "@/infra/store/reduxStore";

import { worker } from "@/adapters/secondary/msw/server";
import { isAuth } from "../auth/isAuth";
import { getProjectById } from "../projects/getProjectById";
import { Token } from "../auth/auth";
import { postNewTask } from "./postNewTask";
import { TaskStatus } from "@/adapters/secondary/task/task";

describe("tasks gestion", () => {
  let store: ReduxStore;
  let token: Token["access_token"];
  beforeAll(() => {
    worker.listen();
    localStorage.setItem("authToken", "access_token1234");
  });
  beforeEach(() => {
    // const authRetriever = axiosLoginRetriever();
    // const authGateway = loginGateway(authRetriever);
    store = initReduxStore();
    store.dispatch(isAuth());
    token = store.getState().auth.access_token!;
    //initialState = store.getState();
  });

  test("should get all tasks with a project id", async () => {
    await store.dispatch(
      getProjectById({
        token,
        projectId: "2",
      }),
    );
    expect(store.getState().projects.selected).toBeDefined();
    // expect(store.getState().projects.selected?.id).toEqual("2");
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
    console.log(store.getState().tasks.list);
    expect(
      store.getState().tasks.list.filter((task) => task.id === "6"),
    ).toHaveLength(1);
  });
});
