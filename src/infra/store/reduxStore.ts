import { AuthGateway } from "@/core/gateways/authGateways";
import { Action, Store, ThunkAction, ThunkDispatch, configureStore } from "@reduxjs/toolkit";
import { AppState } from "./appState";
import { authRetrievalReducer as auth } from "@/core/reducers/auth.reducer";
import { projectsReducer  as projects} from "@/core/reducers/projects.reducer";
import { tasksReducer  as tasks} from "@/core/reducers/tasks.reducer";
import { useDispatch, useSelector } from "react-redux";
export type Gateways = {
  authGateway: AuthGateway;
};

export const initReduxStore = (/* gateways?: Partial<Gateways> */) => {
  return configureStore({
    reducer: {auth,projects,tasks},
    // middleware: (getDefaultMiddleware) =>
    //   getDefaultMiddleware({
    //     thunk: { extraArgument: gateways },
    //     serializableCheck: false,
    //   }),
    devTools: true,
  });
};

export type ReduxStore = Store<AppState> & {
  dispatch: ThunkDispatch<AppState, Gateways, Action>;
};

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  Gateways,
  Action
>;

export type AppDispatch = ThunkDispatch<AppState, Gateways, Action>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<AppState>();