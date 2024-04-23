import { ReduxStore, initReduxStore } from "@/infra/store/reduxStore";
// import { authGateway as loginGateway } from "../../../adapters/secondary/auth/authGateway";
// import { axiosLoginRetriever } from "../../../adapters/secondary/auth/axiosLoginRetriever";
//import { AppState } from "@/infra/store/appState";
import { getProjectsListByUserId } from "./getProjectListByUserId";
import { worker } from "@/adapters/secondary/msw/server";
import { isAuth } from "../auth/isAuth";
import { getProjectById } from "./getProjectById";

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
    await store.dispatch(
      getProjectsListByUserId({ userId: "1", token: "wrongToken" }),
    );
    expect(store.getState().projects.error).not.toBeUndefined();
    expect(store.getState().projects.list).toStrictEqual([]);
  });

  test("should get projects of a user with his Id and token", async () => {
    localStorage.setItem("authToken", "Token.1234");
    store.dispatch(isAuth());
    await store.dispatch(
      getProjectsListByUserId({
        userId: "1",
        token: store.getState().auth.access_token,
      }),
    );
    expect(store.getState().projects.list).toHaveLength(2);
  });
  test("should get one project with the projectId", async () => {
    localStorage.setItem("authToken", "Token.1234");
    store.dispatch(isAuth());
    await store.dispatch(
      getProjectById({
        userId: "1",
        token: store.getState().auth.access_token,
        projectId: "2",
      }),
    );
    expect(store.getState().projects.selected).toHaveLength(1);
  });
});
