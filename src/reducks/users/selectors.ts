import { createSelector } from "reselect";
import { initialStateUsersType } from "../store/type";

const usersSelector = (state: { users: initialStateUsersType }) => state.users;

export const getIsSignedIn = createSelector(
  [usersSelector],
  (state) => state.isSignedIn
);

export const getProductsInCart = createSelector(
  [usersSelector],
  (state) => state.cart
);

export const getUserId = createSelector([usersSelector], (state) => state.uid);

export const getUsername = createSelector(
  [usersSelector],
  (state) => state.username
);
