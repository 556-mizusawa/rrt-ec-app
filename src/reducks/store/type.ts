import { RouterState } from "connected-react-router";
import { Store, $CombinedState, AnyAction } from "redux";
import { History } from "history";

export type CreateStore = (
  history: History<unknown>
) => Store<
  {
    readonly [$CombinedState]?: undefined;
  } & {
    products: {
      list: never[];
    };
    router: RouterState<unknown>;
    users: {
      isSignedIn: boolean;
      role: string;
      uid: string;
      username: string;
    };
  },
  AnyAction
>;

export type initialStateUsersType = {
  isSignedIn: boolean;
  role: string;
  uid: string;
  username: string;
};

export type initialStateProductsType = {
  products: {
    list: [];
  };
};
