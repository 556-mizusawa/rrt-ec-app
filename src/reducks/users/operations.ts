import { signInAction, signOutAction } from "./actions";
import { CallHistoryMethodAction, push } from "connected-react-router";
import { Dispatch } from "react";
import {
  isValidEmailFormat,
  isValidPasswordFormat,
  isValidRequiredInput,
} from "../../function/common";
import { hideLoadingAction, showLoadingAction } from "../loading/actions";
import firebase from "firebase";
import { auth, db, FirebaseTimeStamp } from "../../firebase/index";
import { userActionType } from "./type";
import { loadingActionType } from "../loading/type";

export const listenAuthState = () => {
  return async (
    dispatch: Dispatch<
      userActionType | CallHistoryMethodAction<[string, unknown?]>
    >
  ): Promise<firebase.Unsubscribe> => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;

        db.collection("users")
          .doc(uid)
          .get()
          .then((snapshot: firebase.firestore.DocumentData) => {
            const data = snapshot.data();

            dispatch(
              signInAction({
                isSignedIn: true,
                role: data.role,
                uid: uid,
                username: data.username,
              })
            );
          });
      } else {
        dispatch(push("/signin"));
      }
    });
  };
};

export const resetPassword = (email: string) => {
  return async (
    dispatch: Dispatch<CallHistoryMethodAction<[string, unknown?]>>
  ): Promise<false | undefined> => {
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

export const signIn = (email: string, password: string) => {
  return async (
    dispatch: Dispatch<
      | userActionType
      | loadingActionType
      | CallHistoryMethodAction<[string, unknown?]>
    >
  ): Promise<false | undefined> => {
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
          .then((snapshot: firebase.firestore.DocumentData) => {
            const data = snapshot.data();

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
) => (
  dispatch: Dispatch<
    userActionType | CallHistoryMethodAction<[string, unknown?]>
  >
) => Promise<false | void> = (
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

export const signOut = () => {
  return async (
    dispatch: Dispatch<
      userActionType | CallHistoryMethodAction<[string, unknown?]>
    >
  ): Promise<void> => {
    auth.signOut().then(() => {
      dispatch(signOutAction());
      dispatch(push("/.signin"));
    });
  };
};
