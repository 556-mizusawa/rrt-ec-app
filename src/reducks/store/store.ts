import {
  createStore as reduxCreateStore,
  combineReducers,
  Store,
  $CombinedState,
} from "redux";

import { UsersReducer } from "../users/reducers";

interface storeInterface {
  readonly [$CombinedState]?: undefined;

  users: {
    isSignedIn: boolean;
    uid: string;
    username: string;
  };

  type: "SIGN_IN";
  payload: {
    isSignedIn: boolean;
    uid: string;
    username: string;
  };
}

const createStore: () => Store<storeInterface> = () => {
  return reduxCreateStore(
    combineReducers({
      users: UsersReducer,
    })
  );
};

export default createStore;
