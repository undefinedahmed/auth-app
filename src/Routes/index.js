import * as React from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
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
              pathname: "/home",
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

function CustomRoutes() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}
export default CustomRoutes;
