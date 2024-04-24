import { ReduxStore, initReduxStore } from "@/infra/store/reduxStore";
// import { authGateway as loginGateway } from "../../../adapters/secondary/auth/authGateway";
// import { axiosLoginRetriever } from "../../../adapters/secondary/auth/axiosLoginRetriever";
//import { AppState } from "@/infra/store/appState";
import { getProjectsListByUserId } from "./getProjectListByUserId";
import { worker } from "@/adapters/secondary/msw/server";
import { isAuth } from "../auth/isAuth";
import { getProjectById } from "./getProjectById";
import { Token } from "../auth/auth";
import { Project, ProjectStatus } from "@/adapters/secondary/project/project";
import { postNewProject } from "./postNewProject";

describe("get projects list and store it", () => {
  let store: ReduxStore;
  //let initialState: AppState;
  beforeAll(() => {
    worker.listen();
  });
  beforeEach(() => {
    // const authRetriever = axiosLoginRetriever();
    // const authGateway = loginGateway(authRetriever);
    store = initReduxStore();
    //initialState = store.getState();
  });

  test("should not get projects without token", async () => {
    await store.dispatch(getProjectsListByUserId({ token: "wrongToken" }));
    expect(store.getState().projects.error).not.toBeUndefined();
    expect(store.getState().projects.list).toStrictEqual([]);
  });

  test("should get projects of a user with his Id and token", async () => {
    localStorage.setItem("authToken", "access_token1234");
    store.dispatch(isAuth());
    await store.dispatch(
      getProjectsListByUserId({
        token: store.getState().auth.access_token!,
      }),
    );
    expect(store.getState().projects.list).toHaveLength(2);
  });
  test("should get one project with the projectId", async () => {
    localStorage.setItem("authToken", "access_token1234");
    store.dispatch(isAuth());
    await store.dispatch(
      getProjectById({
        token: store.getState().auth.access_token,
        projectId: "2",
      }),
    );
    expect(store.getState().projects.selected).toHaveLength(1);
  });
});
describe("add project", () => {
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

  test("add a project in fake db", async () => {
    const newProject: Project = {
      id: "4",
      title: "fourth project",
      status: ProjectStatus.PENDING,
      owner: "1",
      collaborators: ["2"],
    };
    await store.dispatch(postNewProject({token,newProject}))
    

    expect(store.getState().projects.list).toHaveLength(3)
  });
});
