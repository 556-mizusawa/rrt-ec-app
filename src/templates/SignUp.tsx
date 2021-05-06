import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { push } from "connected-react-router";
import React, { KeyboardEvent, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { PrimaryButton, TextInput } from "../components/UIkit";
import { signUp } from "../reducks/users/operations";

const SignUp: React.FC = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState<string>(""),
    [email, setEmail] = useState<string>(""),
    [password, setPassword] = useState<string>(""),
    [confirmPassword, setConfirmPassword] = useState<string>(""),
    [showPassword, setShowPassword] = useState<boolean>(false),
    [isComposed, setIsComposed] = useState(false);

  const inputUsername = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(event.target.value);
    },
    [setUsername]
  );

  const inputEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

  const inputPassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    []
  );

  const inputConfirmPassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setConfirmPassword(event.target.value);
    },
    []
  );

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const enterPushEvent = (e: KeyboardEvent) => {
    if (isComposed) return;

    if (e.key === "Enter") {
      dispatch(signUp(username, email, password, confirmPassword));
      e.preventDefault();
    }
  };

  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">アカウント登録</h2>
      <Divider />
      <div className="module-spacer--medium" />
      <TextInput
        autoFocus={true}
        fullWidth={true}
        label={"ユーザー名"}
        multiline={false}
        required={true}
        rows={1}
        value={username}
        type={"text"}
        onChange={inputUsername}
      />
      <TextInput
        fullWidth={true}
        label={"メールアドレス"}
        multiline={false}
        required={true}
        rows={1}
        value={email}
        type={"email"}
        onChange={inputEmail}
      />
      <TextInput
        fullWidth={true}
        label={"パスワード"}
        multiline={false}
        required={true}
        rows={1}
        value={password}
        type={showPassword ? "text" : "password"}
        onChange={inputPassword}
      />
      <FormControl margin="dense" fullWidth={true}>
        <InputLabel htmlFor="standard-adornment-password">
          パスワード(確認用)
        </InputLabel>
        <Input
          id="standard-adornment-password"
          type={showPassword ? "text" : "password"}
          required={true}
          value={confirmPassword}
          onChange={inputConfirmPassword}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          onKeyDown={enterPushEvent}
          onCompositionStart={() => {
            setIsComposed(true);
          }}
          onCompositionEnd={() => {
            setIsComposed(false);
          }}
        />
      </FormControl>
      <div className="module-spacer--medium" />
      <div className="center">
        <PrimaryButton
          color={"primary"}
          label={"アカウントを登録する"}
          onClick={() =>
            dispatch(signUp(username, email, password, confirmPassword))
          }
        />

        <div className="module-spacer--extra-extra-small" />

        <p className="u-pointer-set" onClick={() => dispatch(push("./signin"))}>
          アカウントをお持ちの方はこちら
        </p>
      </div>
    </div>
  );
};

export default SignUp;
