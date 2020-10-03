import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.scss";
import { HashRouter } from "react-router-dom";
import { StoreProvide } from "./store/StoreProvide/StoreProvide";

ReactDOM.render(
  <HashRouter>
    <StoreProvide>
      <App />
    </StoreProvide>
  </HashRouter>,
  document.getElementById("root")
);
