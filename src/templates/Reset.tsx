import React, { KeyboardEvent, useCallback, useState } from "react";
import Divider from "@material-ui/core/Divider";
import { useDispatch } from "react-redux";
import { PrimaryButton, TextInput } from "../components/UIkit";
import { resetPassword } from "../reducks/users/operations";
import { push } from "connected-react-router";

const Reset: React.FC = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState<string>(""),
    [isComposed, setIsComposed] = useState(false);

  const inputEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

  const enterPushEvent = (e: KeyboardEvent) => {
    if (isComposed) return;

    if (e.key === "Enter") {
      dispatch(resetPassword(email));
      e.preventDefault();
    }
  };

  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">パスワードリセット</h2>
      <Divider />
      <div className="module-spacer--medium" />
      <TextInput
        autoFocus={true}
        fullWidth={true}
        label={"メールアドレス"}
        multiline={false}
        required={true}
        rows={1}
        value={email}
        type={"email"}
        onChange={inputEmail}
        onKeyDown={enterPushEvent}
        onCompositionStart={() => {
          setIsComposed(true);
        }}
        onCompositionEnd={() => {
          setIsComposed(false);
        }}
      />

      <div className="module-spacer--medium" />

      <div className="center">
        <PrimaryButton
          color={"secondary"}
          label={"パスワードをリセット"}
          onClick={() => dispatch(resetPassword(email))}
        />

        <div className="module-spacer--extra-extra-small" />

        <p className="u-pointer-set" onClick={() => dispatch(push("/signin"))}>
          ログイン画面に戻る
        </p>
      </div>
    </div>
  );
};

export default Reset;
