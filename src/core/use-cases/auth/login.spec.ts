import { ReduxStore, initReduxStore } from "@/infra/store/reduxStore";
// import { authGateway as loginGateway } from "../../../adapters/secondary/auth/authGateway";
// import { axiosLoginRetriever } from "../../../adapters/secondary/auth/axiosLoginRetriever";
//import { AppState } from "@/infra/store/appState";
import { login } from "./login";
import { worker } from "@/adapters/secondary/msw/server";

describe("auth login gateway", () => {
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
  it("should get the access_token and refresh_token and user informations", async () => {
    const userCredentials = {
      email: "fakeEmail123@gmail.com",
      password: "password1234",
    };
    await store.dispatch(login(userCredentials));
    expect(store.getState().auth.access_token).toBeTruthy();
  });
});
