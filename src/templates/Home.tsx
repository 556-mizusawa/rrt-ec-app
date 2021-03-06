import React from "react";
import { getUserId, getUsername } from "../reducks/users/selectors";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../reducks/users/operations";
import { initialStateUsersType } from "../reducks/store/type";

const Home: () => JSX.Element = () => {
  const dispatch = useDispatch();
  const selector = useSelector(
    (state: { users: initialStateUsersType }) => state
  );
  const uid = getUserId(selector);
  const username = getUsername(selector);

  return (
    <div>
      <h2>Home</h2>
      <p>ユーザーID:{uid}</p>
      <p>ユーザー名:{username}</p>
      <button onClick={() => dispatch(signOut())}>SIGN OUT</button>
    </div>
  );
};

export default Home;
