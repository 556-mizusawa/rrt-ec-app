import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { PrimaryButton } from "../components/UIkit";
import { initialStateUsersType } from "../reducks/store/type";
import { signOut } from "../reducks/users/operations";
import { getUserId, getUsername } from "../reducks/users/selectors";

const User: React.FC = () => {
  const dispatch = useDispatch();
  const selector = useSelector(
    (state: { users: initialStateUsersType }) => state
  );
  const uid = getUserId(selector);
  const username = getUsername(selector);

  return (
    <div>
      <h2>ユーザー情報</h2>
      <p>ユーザーID:{uid}</p>
      <p>ユーザー名:{username}</p>
      <PrimaryButton
        color={"secondary"}
        label={"ログアウト"}
        onClick={() => dispatch(signOut())}
      />
    </div>
  );
};

export default User;
