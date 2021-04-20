import React from "react";
import ReactDOM from "react-dom";
import Record from "./containers/Record";
import Template from "./containers/Template";
import Main from "./containers/Main";
import { HashRouter, Switch, Route } from "react-router-dom";

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route path="/template" component={Template} />
      <Route path="/record" component={Record} />
      <Route component={Main} />
    </Switch>
  </HashRouter>,
  document.getElementById("root")
);
