import React from "react";
import "./index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import Menu from "./components/Menu";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Menu />
          <LandingPage />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
