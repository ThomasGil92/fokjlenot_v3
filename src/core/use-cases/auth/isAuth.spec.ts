
import { ReduxStore, initReduxStore } from "@/infra/store/reduxStore";
import { isAuth } from "./isAuth";

describe("auth retrieval", () => {
  let store: ReduxStore;

  //let initialState: AppState;

  beforeEach(() => {
    store = initReduxStore();
    //initialState = store.getState();
  });

  it("should not get isAuth=true if no token", () => {
    store.dispatch(isAuth());
    expect(store.getState().auth.isAuth).toBeFalsy()
  });
  it("should get isAuth=true if token", () => {
    localStorage.setItem("authToken", "fakeToken");
    store.dispatch(isAuth());
    expect(store.getState().auth.isAuth).toBeTruthy();
  });
});
