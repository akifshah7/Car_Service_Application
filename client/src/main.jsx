import ReactDOM from "react-dom/client";
import { Provider } from "jotai";
import AppRouter from "./router";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <Provider>
      <AppRouter />
  </Provider>
);
