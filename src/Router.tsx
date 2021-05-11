import React from "react";
import { Route, Switch } from "react-router";
import {
  ProductDetail,
  ProductEdit,
  ProductList,
  SignIn,
  SignUp,
  Reset,
  CartList,
  FavoriteList,
  OrderComfirm,
  OrderReset,
  User,
  OrderHistory,
} from "./templates";
import Auth from "./Auth";

const Router: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signin/reset" component={Reset} />

      <Auth>
        <Route exact path="(/)?" component={ProductList} />
        <Route exact path="/product/:id" component={ProductDetail} />
        <Route path="/product/edit(/:id)?" component={ProductEdit} />

        <Route exact path="/cart" component={CartList} />
        <Route exact path="/favorite" component={FavoriteList} />
        <Route exact path="/order/comfirm" component={OrderComfirm} />
        <Route exact path="/order/history" component={OrderHistory} />
        <Route exact path="/order/reset" component={OrderReset} />
        <Route exact path="/user" component={User} />
      </Auth>
    </Switch>
  );
};

export default Router;
