import React from "react";
import "./index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import Menu from "./components/Menu";
import Messages from "./components/Messages";
import Contacts from "./components/Contacts";
import Settings from "./components/Settings";
import Register from "./components/Register";

function App() {
  return (
    <div>
      <div className="container mx-auto sm:bg-white sm:bg-opacity-60 sm:mt-24  relative sm:px-4 sm:py-10 sm:shadow-lg sm:rounded-3xl sm:p-20 sm:bg-clip-padding sm:bg-opacity-60 sm:border sm:border-gray-300">
        <Menu />
        <Router>
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
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
      </div>
    </div>
  );
}

export default App;
