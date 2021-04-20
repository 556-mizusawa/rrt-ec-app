import { createSelector } from "reselect";
import { initialStateType } from "../store/type";

const usersSelector = (state: { users: initialStateType }) => state.users;

export const getIsSignedIn = createSelector(
  [usersSelector],
  (state) => state.isSignedIn
);

export const getUserId = createSelector([usersSelector], (state) => state.uid);

export const getUsername = createSelector(
  [usersSelector],
  (state) => state.username
);
