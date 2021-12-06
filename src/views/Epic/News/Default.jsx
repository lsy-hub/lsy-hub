import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import list from "./list";
import add from "./add";
import edit from "./edit";

function Home(props) {
  const baseUrl = props.match.path;
  return (
    <div>
      <Switch>
        <Route path={baseUrl + "/list"} component={list} />
        <Route path={baseUrl + "/add"} component={add} />
        <Route path={baseUrl + "/edit/:id"} component={edit} />

        <Redirect exact from={baseUrl} to={baseUrl + "/list"} />
        <Redirect exact from={baseUrl + "/edit"} to={baseUrl + "/list"} />
      </Switch>
    </div>
  );
}

export default Home;
