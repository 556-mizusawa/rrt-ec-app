import { signInAction, signOutAction } from "./actions";
import { push } from "connected-react-router";
import { Dispatch } from "react";
import {
  isValidEmailFormat,
  isValidPasswordFormat,
  isValidRequiredInput,
} from "../../function/common";
import { hideLoadingAction, showLoadingAction } from "../loading/actions";
import { auth, db, FirebaseTimeStamp } from "../../firebase/index";

export const listenAuthState: () => (dispatch: any) => Promise<any> = () => {
  return async (dispatch: any) => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;

        db.collection("users")
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data: any = snapshot.data();

            dispatch(
              signInAction({
                isSignedIn: true,
                role: data.role,
                uid: uid,
                username: data.username,
              })
            );

            dispatch(push("/"));
          });
      } else {
        dispatch(push("/signin"));
      }
    });
  };
};

export const resetPassword: (
  email: string
) => (dispatch: any) => Promise<false | undefined> = (email: string) => {
  return async (dispatch) => {
    if (!isValidRequiredInput(email)) {
      alert("必須項目が未入力です。");
      return false;
    } else {
      auth
        .sendPasswordResetEmail(email)
        .then(() => {
          alert(
            "入力されたアドレスにパスワードリセット用のメールをお送りしました。"
          );
          dispatch(push("./signin"));
        })
        .catch(() => {
          alert(
            "パスワードリセットに失敗しました。通信環境をご確認の上再度お試し下さい。"
          );
        });
    }
  };
};

export const signIn: (
  email: string,
  password: string
) => (dispatch: Dispatch<any>) => Promise<false | undefined> = (
  email: string,
  password: string
) => {
  return async (dispatch) => {
    dispatch(showLoadingAction("Sign in..."));
    if (!isValidRequiredInput(email, password)) {
      dispatch(hideLoadingAction());
      alert("メールアドレスかパスワードが未入力です。");
      return false;
    }
    if (!isValidEmailFormat(email)) {
      dispatch(hideLoadingAction());
      alert("メールアドレスの形式が不正です。");
      return false;
    }

    auth.signInWithEmailAndPassword(email, password).then((result) => {
      const user = result.user;

      if (user) {
        const uid = user.uid;

        db.collection("users")
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data: any = snapshot.data();

            dispatch(
              signInAction({
                isSignedIn: true,
                role: data.role,
                uid: uid,
                username: data.username,
              })
            );

            dispatch(push("/"));
          });
      }
    });
  };
};

export const signUp: (
  username: string,
  email: string,
  password: string,
  confirmPassword: string
) => (dispatch: Dispatch<any>) => Promise<false | void> = (
  username: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  return async (dispatch) => {
    if (!isValidRequiredInput(email, password, confirmPassword)) {
      alert("必須項目が未入力です。");
      return false;
    }

    if (!isValidEmailFormat(email)) {
      alert("メールアドレスの形式が不正です。もう1度お試しください。");
      return false;
    }
    if (password !== confirmPassword) {
      alert("パスワードが一致しません。もう1度お試しください。");
      return false;
    }

    if (!isValidPasswordFormat(password)) {
      alert("パスワードは6文字以上15文字以内半角英数字で入力してください");
      return false;
    }

    if (password.length < 6) {
      alert("パスワードは6文字以上で入力してください。");
      return false;
    }

    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user;

        if (user) {
          const uid = user.uid;
          const timestamp = FirebaseTimeStamp.now();

          const userInitialData = {
            created_at: timestamp,
            email: email,
            role: "customer",
            uid: "uid",
            updated_at: timestamp,
            username: username,
          };

          db.collection("users")
            .doc(uid)
            .set(userInitialData)
            .then(() => {
              dispatch(push("/"));
            });
        }
      });
  };
};

export const signOut: () => (dispatch: Dispatch<any>) => Promise<void> = () => {
  return async (dispatch) => {
    auth.signOut().then(() => {
      dispatch(signOutAction());
      dispatch(push("/.signin"));
    });
  };
};
