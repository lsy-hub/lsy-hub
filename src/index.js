import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, BrowserRouter } from "react-router-dom";
//判断环境更改路由
const Router =
  process.env.NODE_ENV === "production" ? BrowserRouter : HashRouter;

import App from "./App";

ReactDOM.render(
  <Router>
    <App></App>
  </Router>,
  document.querySelector("#app")
);
