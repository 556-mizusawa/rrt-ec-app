import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIsSignedIn } from "./reducks/users/selectors";
import { listenAuthState } from "./reducks/users/operations";
import { initialStateUsersType } from "./reducks/store/type";

const Auth = ({ children }: { children: any }) => {
  const dispatch = useDispatch();
  const selector = useSelector(
    (state: { users: initialStateUsersType }) => state
  );
  const isSignedIn = getIsSignedIn(selector);

  useEffect(() => {
    if (!isSignedIn) {
      dispatch(listenAuthState());
    }
  }, [isSignedIn, dispatch]);

  if (!isSignedIn) {
    return <div></div>;
  } else {
    return children;
  }
};

export default Auth;
