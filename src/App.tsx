import React from "react";
import "./index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import Menu from "./components/Menu";
import Messages from "./components/Messages";
import Contacts from "./components/Contacts";
import Settings from "./components/Settings";

function App() {
  return (
    <>
      <Menu />
      <Router>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/messages">
            <Messages />
          </Route>
          <Route path="/contacts">
            <Contacts />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
