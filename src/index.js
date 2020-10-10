import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.scss";
import { HashRouter } from "react-router-dom";
import { StoreProvider } from "./store/StoreProvider";

ReactDOM.render(
  <HashRouter>
    <StoreProvider>
      <App />
    </StoreProvider>
  </HashRouter>,
  document.getElementById("root")
);
