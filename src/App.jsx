import React from "react";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";

import login from "./views/login";
import Epic from "./views/Epic";
import "antd/dist/antd.css";

function App(props) {
  return (
    <Switch>
      <Route path="/login" component={login} />
      <Route path="/epic" component={Epic} />
      <Redirect from="/" to="login" exact />
    </Switch>
  );
}
App = withRouter(App);

export default App;
