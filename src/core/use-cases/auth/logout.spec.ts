import { ReduxStore, initReduxStore } from "@/infra/store/reduxStore";
import { logout } from "./logout";

describe("logout", () => {
  let store: ReduxStore;
  beforeAll(() => {
    store = initReduxStore();
  });
  test("logout must remove authToken from localhost and set isAuth from the store to false", () => {
    localStorage.setItem("authToken","token1234")
    store.dispatch(logout());
    expect(localStorage.getItem("authToken")).toBeNull()
    expect(store.getState().auth.isAuth).toBeFalsy()
    expect(store.getState().auth.access_token).toBeNull()

  });
});
