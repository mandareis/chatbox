import * as React from "react";
import "./index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import Menu from "./components/Menu";
import Messages from "./components/Messages";
import Contacts from "./components/Contacts";
import Settings from "./components/Settings";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import LoggedOutRoute from "./components/LoggedOutRoute";
import LoggedInRoute from "./components/LoggedInRoute";
import MobileMenu from "./components/MobileMenu";

function App() {
  return (
    <div>
      <MobileMenu />
      <div className="container mx-auto sm:bg-white sm:bg-opacity-60 relative sm:px-4 sm:py-10 sm:shadow-lg pt-20 sm:mt-24 sm:rounded-3xl sm:bg-clip-padding sm:bg-opacity-60 sm:border sm:border-gray-300">
        <Menu />
        <Router>
          <Switch>
            <LoggedOutRoute path="/" exact={true} component={LandingPage} />
            <LoggedOutRoute
              path="/register"
              exact={true}
              component={Register}
            />
            <LoggedOutRoute path="/login" exact={true} component={Login} />
            <LoggedInRoute path="/messages" exact={true} component={Messages} />
            <LoggedInRoute path="/contacts" exact={true} component={Contacts} />
            <LoggedInRoute path="/settings" exact={true} component={Settings} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
