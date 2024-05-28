import React from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { initReduxStore } from "@/infra/store/reduxStore";
import { Provider } from "react-redux";
import RouteProvider from "@/presentation/Router";

import "@/presentation/components/styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";
//import { mockAuthGateway } from "./adapters/secondary/auth/mockAuthGateway";
// import { stubAuthTokenRetriever } from "./adapters/secondary/auth/stubAuthTokenRetriever";
//import { AuthGateway } from "./core/gateways/authGateways";
const deferRender = async () => {
  if (import.meta.env.VITE_ENABLE_MSW === "false" || undefined) {
    return;
  }
  const { browserWorker } = await import("@/adapters/secondary/msw/browser");
  return browserWorker.start();
};

//const authGateway = mockAuthGateway()

const store = initReduxStore(/* { authGateway } */);

deferRender().then(() => {
  createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <GoogleOAuthProvider clientId='393251426317-lthmaqnl4l4hg8hgq0tsm1jlp17u7frk.apps.googleusercontent.com'>
        <Provider store={store}>
          <RouteProvider />
        </Provider>
      </GoogleOAuthProvider>
    </React.StrictMode>,
  );
});
