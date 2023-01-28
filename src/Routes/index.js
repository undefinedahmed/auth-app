import * as React from "react";
import {
  Switch,
  Route,
  // BrowserRouter as Router,
  Router,
  Redirect,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import Home from "../Pages/home";
import Login from "../Pages/login";
import Signup from "../Pages/signup";

const isAuthenticated = () => {
  let token = localStorage.getItem("token_auth");
  if (token) {
    return true;
  }
  return false;
};

function PublicRoute({ children, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function PrivateRoute({ children, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
const history = createBrowserHistory();

function CustomRoutes() {
  return (
    <Router history={history}>
      <Switch>
        <PublicRoute path="/login" isAuthenticated={isAuthenticated()}>
          <Login />
        </PublicRoute>
        <PublicRoute path="/signup" isAuthenticated={isAuthenticated()}>
          <Signup />
        </PublicRoute>

        <PrivateRoute path="/" isAuthenticated={isAuthenticated()}>
          <Home />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}
export default CustomRoutes;
