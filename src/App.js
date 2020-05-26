import React from "react";

import { BrowserRouter as Router, Switch, Route,Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Edit from "./pages/Edit";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route  path="/login">
          <Login />
        </Route>
        <Route  path="/edit">
          <Edit />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
