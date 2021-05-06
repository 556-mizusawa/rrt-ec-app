import { signInAction, signOutAction } from "./actions";
import { push } from "connected-react-router";
import {
  isValidEmailFormat,
  isValidPasswordFormat,
  isValidRequiredInput,
} from "../../function/common";
import { hideLoadingAction, showLoadingAction } from "../loading/actions";
import firebase from "firebase";
import { auth, db, FirebaseTimeStamp } from "../../firebase/index";
import { userOpDispatch } from "./type";
import { FFD } from "../../firebase/types";

export const addProductToCart = (addedProduct: FFD) => {
  return async (
    dispatch: userOpDispatch,
    getState: () => { users: { uid: string } }
  ): Promise<void> => {
    const uid = getState().users.uid;
    const cartRef = db.collection("users").doc(uid).collection("cart").doc();
    addedProduct["cartId"] = cartRef.id;
    await cartRef.set(addedProduct);
    dispatch(push("/"));
  };
};

export const listenAuthState = () => {
  return async (dispatch: userOpDispatch): Promise<firebase.Unsubscribe> => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;

        db.collection("users")
          .doc(uid)
          .get()
          .then((snapshot: FFD) => {
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
  return async (dispatch: userOpDispatch): Promise<false | undefined> => {
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
  return async (dispatch: userOpDispatch): Promise<false | undefined> => {
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
          .then((snapshot: FFD) => {
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
) => (dispatch: userOpDispatch) => Promise<false | void> = (
  username,
  email,
  password,
  confirmPassword
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
  return async (dispatch: userOpDispatch): Promise<void> => {
    auth.signOut().then(() => {
      dispatch(signOutAction());
      dispatch(push("/.signin"));
    });
  };
};
