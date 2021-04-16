import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./assets/reset.css";
import "./assets/style.css";
import { initialStateInter } from "./reducks/store/initialState";
import { signInAction } from "./reducks/users/actions";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: initialStateInter) => state);

  console.log(selector.users);

  return (
    <div>
      <h2>Hello</h2>
      <button
        onClick={() =>
          dispatch(signInAction({ uid: "00001", username: "556" }))
        }
      >
        Sing In
      </button>
    </div>
  );
};

export default App;
