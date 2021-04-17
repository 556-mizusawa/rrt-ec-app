import {
  createStore as reduxCreateStore,
  combineReducers,
  Store,
  $CombinedState,
  applyMiddleware,
} from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { UsersReducer } from "../users/reducers";
import { History } from "history";

const createStore = (history: History<unknown>) => {
  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
      users: UsersReducer,
    }),
    applyMiddleware(routerMiddleware(history))
  );
};

export default createStore;
