import React from "react";
import { Route, Switch } from "react-router";
import { ProductEdit, ProductList, SignIn, SignUp, Reset } from "./templates";
import Auth from "./Auth";

const Router: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signin/reset" component={Reset} />

      <Auth>
        <Route path="/product/edit(/:id)?" component={ProductEdit} />
        <Route exact path="(/)?" component={ProductList} />
      </Auth>
    </Switch>
  );
};

export default Router;
