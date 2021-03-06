import {
    fetchOrdersHistoryAction,
    fetchProductsInCartAction,
    fetchProductsInFavoriteAction,
    signInAction,
    signOutAction,
} from "./actions";
import { push } from "connected-react-router";
import { isValidEmailFormat, isValidPasswordFormat, isValidRequiredInput } from "../../function/common";
import { hideLoadingAction, showLoadingAction } from "../loading/actions";
import firebase from "firebase";
import { auth, db, FirebaseTimeStamp } from "../../firebase/index";
import { userOpDispatch } from "./type";
import { FFD } from "../../firebase/types";
import { Dispatch } from "react";

export const addProductToCart = (addedProduct: FFD) => {
    return async (dispatch: userOpDispatch, getState: () => { users: { uid: string } }): Promise<void> => {
        const uid = getState().users.uid;
        const cartRef = db.collection("users").doc(uid).collection("cart").doc();
        addedProduct["cartId"] = cartRef.id;
        await cartRef.set(addedProduct);
        dispatch(push("/cart"));
    };
};

export const addProductToFavorite = (keepProduct: FFD) => {
    return async (dispatch: userOpDispatch, getState: () => { users: { uid: string } }): Promise<void> => {
        const uid = getState().users.uid;
        const favoriteRef = db.collection("users").doc(uid).collection("favorite").doc();
        keepProduct["favoriteId"] = favoriteRef.id;
        await favoriteRef.set(keepProduct);
    };
};

export const fetchOrdersHistory = () => {
    return async (dispatch: userOpDispatch, getState: () => { users: { uid: string } }): Promise<void> => {
        const uid = getState().users.uid;
        const list: FFD[] = [];

        db.collection("users")
            .doc(uid)
            .collection("orders")
            .orderBy("updated_at", "desc")
            .get()
            .then((snapshots) => {
                snapshots.forEach((snapshot) => {
                    const data = snapshot.data();
                    list.push(data);
                });
                dispatch(fetchOrdersHistoryAction(list));
            });
    };
};

export const fetchProductsInCart = (products: FFD) => {
    return async (
        dispatch: Dispatch<{
            type: string;
            payload: FFD;
        }>
    ): Promise<void> => {
        dispatch(fetchProductsInCartAction(products));
    };
};

export const fetchProductsInFavorite = (products: FFD) => {
    return async (
        dispatch: Dispatch<{
            type: string;
            payload: FFD;
        }>
    ): Promise<void> => {
        dispatch(fetchProductsInFavoriteAction(products));
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
            alert("?????????????????????????????????");
            return false;
        } else {
            auth.sendPasswordResetEmail(email)
                .then(() => {
                    alert("???????????????????????????????????????????????????????????????????????????????????????????????????");
                    dispatch(push("./signin"));
                })
                .catch(() => {
                    alert("????????????????????????????????????????????????????????????????????????????????????????????????????????????");
                });
        }
    };
};

export const signIn = (email: string, password: string) => {
    return async (dispatch: userOpDispatch): Promise<false | undefined> => {
        dispatch(showLoadingAction("Sign in..."));
        if (!isValidRequiredInput(email, password)) {
            dispatch(hideLoadingAction());
            alert("????????????????????????????????????????????????????????????");
            return false;
        }
        if (!isValidEmailFormat(email)) {
            dispatch(hideLoadingAction());
            alert("????????????????????????????????????????????????");
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
                                cart: [],
                                favorite: [],
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
) => (dispatch: userOpDispatch) => Promise<false | void> = (username, email, password, confirmPassword) => {
    return async (dispatch) => {
        if (!isValidRequiredInput(email, password, confirmPassword)) {
            alert("?????????????????????????????????");
            return false;
        }

        if (!isValidEmailFormat(email)) {
            alert("??????????????????????????????????????????????????????1???????????????????????????");
            return false;
        }
        if (password !== confirmPassword) {
            alert("?????????????????????????????????????????????1???????????????????????????");
            return false;
        }

        if (!isValidPasswordFormat(password)) {
            alert("??????????????????6????????????15??????????????????????????????????????????????????????");
            return false;
        }

        if (password.length < 6) {
            alert("??????????????????6??????????????????????????????????????????");
            return false;
        }

        return auth.createUserWithEmailAndPassword(email, password).then((result) => {
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
