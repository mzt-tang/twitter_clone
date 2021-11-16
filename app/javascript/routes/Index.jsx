import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Posts from "../components/Posts";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Posts} />
    </Switch>
  </Router>
);