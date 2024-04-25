import { ReduxStore, initReduxStore } from "@/infra/store/reduxStore";

import { worker } from "@/adapters/secondary/msw/server";
import { isAuth } from "../auth/isAuth";
import { getProjectById } from "../projects/getProjectById";
import { Token } from "../auth/auth";

describe("get projects list and store it", () => {
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
    console.log(store.getState())
    expect(store.getState().projects.selected).toBeDefined();
    // expect(store.getState().projects.selected?.id).toEqual("2");
    expect(store.getState().tasks.list).not.toBeUndefined()
  });
});
