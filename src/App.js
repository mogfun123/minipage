import React from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route,Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Backweb from "./pages/Backweb";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/backweb">
          <Backweb />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
