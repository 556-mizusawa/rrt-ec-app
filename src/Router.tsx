import React from "react";
import { Route, Switch } from "react-router";
import { Home, SignIn, SignUp } from "./templates";
import Auth from "./Auth";

const Router = () => {
  return (
    <Switch>
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/SignIn" component={SignIn} />

      <Auth>
        <Route exact path="(/)?" component={Home} />
      </Auth>
    </Switch>
  );
};

export default Router;
