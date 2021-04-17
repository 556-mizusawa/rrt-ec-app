import React from "react";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <h2>ログイン</h2>
      <button onClick={() => dispatch(push("/"))}>ログイン</button>
    </div>
  );
};

export default Login;
